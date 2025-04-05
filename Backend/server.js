const express = require('express');
const cors = require('cors');
const { SerialPort } = require('serialport');  // Updated import
const { ReadlineParser } = require('@serialport/parser-readline');
const connectDB = require('./src/config/db.js');
const userRoutes = require('./src/routes/userRoutes');
const { register, login, getProfile } = require('./src/controllers/userController');
const auth = require('./src/middleware/auth');
require('dotenv').config();

const app = express();
let serialPort = null; // Renamed to avoid confusion with the PORT variable
let parser = null;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Bluetooth Endpoints
app.get('/api/bluetooth/connect', async (req, res) => {
  try {
    // List available ports with more detailed error handling
    const ports = await SerialPort.list();
    console.log('Available ports:', ports);
    
    // More robust port finding logic
    const hc05Port = ports.find(p => 
      p.manufacturer?.toLowerCase().includes('arduino') || 
      p.manufacturer?.toLowerCase().includes('hc-05') ||
      p.friendlyName?.toLowerCase().includes('bluetooth') ||
      p.path.toLowerCase().includes('com') // Windows
      || p.path.toLowerCase().includes('tty') // Linux/Mac
    );

    if (!hc05Port) {
      return res.status(404).json({ 
        connected: false, 
        message: `HC-05 not found. Available ports: ${JSON.stringify(ports.map(p => p.path))}`
      });
    }

    // Create new serial port connection with updated syntax
    serialPort = new SerialPort({
      path: hc05Port.path,
      baudRate: 9600,
    });

    // Set up parser
    parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));

    serialPort.on('open', () => {
      console.log(`Bluetooth connection established on ${hc05Port.path}`);
      res.json({ 
        connected: true, 
        message: `Connected to ${hc05Port.path}` 
      });
    });

    serialPort.on('error', (err) => {
      console.error('Port error:', err);
      if (!res.headersSent) {
        res.status(500).json({ 
          connected: false, 
          message: `Port error: ${err.message}` 
        });
      }
    });

    // Handle incoming data from Arduino
    parser.on('data', (data) => {
      console.log('Received from Arduino:', data);
    });

  } catch (error) {
    console.error('Connection error:', error);
    if (!res.headersSent) {
      res.status(500).json({ 
        connected: false, 
        message: `Connection failed: ${error.message}` 
      });
    }
  }
});

app.post('/api/bluetooth/send', (req, res) => {
  if (!serialPort || !serialPort.isOpen) {
    return res.status(400).json({ 
      success: false, 
      message: 'Not connected to Bluetooth device' 
    });
  }

  const { command } = req.body;
  if (!command || typeof command !== 'string') {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid command format' 
    });
  }

  try {
    // Add command terminator and send
    serialPort.write(`${command}\n`, (err) => {
      if (err) {
        console.error('Write error:', err);
        return res.status(500).json({ 
          success: false, 
          message: `Failed to send command: ${err.message}` 
        });
      }
      console.log('Command sent:', command);
      res.json({ 
        success: true, 
        message: `Command "${command}" sent successfully` 
      });
    });
  } catch (error) {
    console.error('Send error:', error);
    res.status(500).json({ 
      success: false, 
      message: `Unexpected error: ${error.message}` 
    });
  }
});

// Add disconnect endpoint
app.get('/api/bluetooth/disconnect', (req, res) => {
  if (serialPort && serialPort.isOpen) {
    serialPort.close((err) => {
      if (err) {
        console.error('Disconnect error:', err);
        return res.status(500).json({ 
          success: false, 
          message: `Disconnect failed: ${err.message}` 
        });
      }
      console.log('Bluetooth disconnected');
      res.json({ 
        success: true, 
        message: 'Disconnected successfully' 
      });
    });
  } else {
    res.json({ 
      success: true, 
      message: 'No active connection to disconnect' 
    });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message);
  res.status(err.status || 500).json({ 
    success: false, 
    message: err.message || 'Server error' 
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));