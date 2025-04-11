import React, { useState } from 'react';
import './Bluetooth.css';

function BluetoothControls() {
  const [command, setCommand] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendCommand = async () => {
    if (!command.trim()) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://crane-advancement-brgo.onrender.com/api/bluetooth/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to send command');
      }

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error sending command:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleBluetoothConnection = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://crane-advancement-brgo.onrender.com/api/bluetooth/connect');
      
      // First check if the response is OK
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Connection failed');
      }

      // Then try to parse as JSON
      const data = await response.json();
      
      setIsConnected(data.connected);
      setConnectionStatus(data.connected ? 'Connected' : 'Disconnected');
    } catch (error) {
      console.error('Bluetooth connection error:', error);
      setError(error.message);
      setIsConnected(false);
      setConnectionStatus('Disconnected');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bluetooth-controls">
      <h3>Bluetooth Controls</h3>
      <div className="connection-status">
        Status: <span className={isConnected ? 'connected' : 'disconnected'}>{connectionStatus}</span>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <button 
        onClick={toggleBluetoothConnection} 
        className="connect-btn"
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : (isConnected ? 'Disconnect' : 'Connect to HC-05')}
      </button>
      
      {isConnected && (
        <>
          <div className="command-input">
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Enter command for Arduino"
              disabled={isLoading}
            />
            <button 
              onClick={sendCommand} 
              disabled={isLoading || !command.trim()}
            >
              {isLoading ? 'Sending...' : 'Send Command'}
            </button>
          </div>
          
          <div className="command-examples">
            <p>Example commands:</p>
            <ul>
              <li>MOVE:100 (distance in mm)</li>
              <li>ROTATE:45 (angle in degrees)</li>
              <li>STOP (emergency stop)</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default BluetoothControls;
