const express = require('express');
const router = express.Router();
const { SerialPort } = require('serialport');

let port;

// Automatically pick a Bluetooth port (COM) with better filtering
router.get('/connect', async (req, res) => {
  try {
    const ports = await SerialPort.list();
    // Filter HC-05 or standard Bluetooth COM ports
    const hc05Port = ports.find(p => 
      (p.manufacturer && p.manufacturer.toLowerCase().includes('microsoft')) ||
      (p.friendlyName && p.friendlyName.toLowerCase().includes('bluetooth')) ||
      p.path.includes('COM8') // Use COM8 as per your working configuration
    );

    if (!hc05Port) {
      return res.status(404).json({ connected: false, message: 'HC-05 not found. Available ports: ' + JSON.stringify(ports) });
    }

    // If port already exists and is open, return success
    if (port && port.isOpen) {
      return res.json({ connected: true, message: 'Already connected to port ' + port.path });
    }

    // If port exists but closed, open it
    if (port && !port.isOpen) {
      await port.open();
      return res.json({ connected: true, message: 'Reconnected to port ' + port.path });
    }

    // Else create new port connection
    port = new SerialPort({
      path: hc05Port.path,
      baudRate: 9600,
      autoOpen: true,
    });

    port.on('open', () => console.log('Serial Port Opened'));
    port.on('error', (err) => console.error('Serial Port Error:', err));

    res.json({ connected: true, port: hc05Port.path });
  } catch (err) {
    console.error('Connection error:', err);
    res.status(500).json({ connected: false, error: err.message });
  }
});

router.post('/send', express.json(), (req, res) => {
  const { message } = req.body;

  if (!port || !port.isOpen) {
    return res.status(400).json({ success: false, error: 'Port not open' });
  }

  port.write(message + '\n', err => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true }); // Removed extra pop-up message response
  });
});

module.exports = router;
