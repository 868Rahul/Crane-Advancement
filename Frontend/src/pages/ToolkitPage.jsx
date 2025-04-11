import React, { useState, useEffect, useRef } from 'react';
import './ToolkitPage.css';
import { Menu, X, CornerUpLeft, ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';
import craneImage from '../assets/Crane.jpg';
import { useNavigate } from 'react-router-dom';
import BluetoothControls from './BluetoothControl.jsx';

function ToolkitPage() {
  const [showContent, setShowContent] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [expandedButton, setExpandedButton] = useState(null);
  const [showOverlayOptions, setShowOverlayOptions] = useState(false);
  const [selectedOverlayOption, setSelectedOverlayOption] = useState('A');
  const [showBluetoothDropdown, setShowBluetoothDropdown] = useState(false);
  const [hideToggleButton, setHideToggleButton] = useState(false);
  const [cameraStreams, setCameraStreams] = useState({
    A: null,
    B: null,
    C: null,
    D: null,
    E: null,
    F: null,
  });
  const [div2Content, setDiv2Content] = useState('camera');
  const [showAllOptions, setShowAllOptions] = useState(true);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [showMainMenu, setShowMainMenu] = useState(false);
  const [showInDiv1, setShowInDiv1] = useState(null);
  const [cameraVisibility, setCameraVisibility] = useState(true);
  const [isBluetoothConnected, setIsBluetoothConnected] = useState(false);
  const [force, setForce] = useState('Force: ...');
  const [wind, setWind] = useState('Wind: ...');

  // Refs for video elements
  const cameraRefs = {
    A: useRef(null),
    B: useRef(null),
    C: useRef(null),
    D: useRef(null),
    E: useRef(null),
    F: useRef(null),
  };

  const fullViewRefs = {
    A: useRef(null),
    B: useRef(null),
    C: useRef(null),
    D: useRef(null),
    E: useRef(null),
    F: useRef(null),
  };

  const navigate = useNavigate();

  const initializeMockStreams = () => {
    return {
      A: new MediaStream(),
      B: new MediaStream(),
      C: null,
      D: null,
      E: null,
      F: null,
    };
  };

  useEffect(() => {
    const fetchData = () => {
      if (isBluetoothConnected) {
        setForce(`Force: ${Math.random() * 1000} N`);
        setWind(`Wind: ${Math.random() * 50} km/h`);
      } else {
        setForce('Force : ...');
        setWind('Wind : ...');
      }
    };

    const interval = setInterval(fetchData, 2000);
    fetchData();
    return () => clearInterval(interval);
  }, [isBluetoothConnected]);

  useEffect(() => {
    const initializeCameras = async () => {
      try {
        const streams = initializeMockStreams();
        for (const camera of ['A', 'B']) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              video: { width: 320, height: 240 }
            });
            streams[camera] = stream;
          } catch (err) {
            console.error(`Error initializing camera ${camera}:`, err);
            streams[camera] = new MediaStream();
          }
        }
        setCameraStreams(streams);
      } catch (err) {
        console.error('Error initializing cameras:', err);
        setCameraStreams(initializeMockStreams());
      }
    };

    initializeCameras();

    return () => {
      Object.values(cameraStreams).forEach(stream => {
        if (stream?.getTracks) {
          stream.getTracks().forEach(track => track.stop());
        }
      });
    };
  }, []);

  useEffect(() => {
    if (cameraVisibility && div2Content === 'camera') {
      Object.keys(cameraRefs).forEach(camera => {
        const videoElement = cameraRefs[camera].current;
        if (videoElement && cameraStreams[camera] && !videoElement.srcObject) {
          videoElement.srcObject = cameraStreams[camera];
          videoElement.play().catch(err => console.error(`Error playing ${camera}:`, err));
        }
      });
    }

    if (showInDiv1) {
      const videoElement = fullViewRefs[showInDiv1].current;
      if (videoElement && cameraStreams[showInDiv1] && !videoElement.srcObject) {
        videoElement.srcObject = cameraStreams[showInDiv1];
        videoElement.play().catch(err => console.error(`Error playing full view ${showInDiv1}:`, err));
      }
    }
  }, [cameraStreams, cameraVisibility, div2Content, showInDiv1]);

  const toggleContent = () => {
    setShowMainMenu(!showMainMenu);
    if (showMainMenu) {
      setDiv2Content('camera');
      setExpandedButton(null);
      setCameraVisibility(true);
    }
  };

  const toggleOverlayOptions = () => {
    setShowOverlayOptions(!showOverlayOptions);
  };

  const handleOptionClick = (option) => {
    setSelectedOverlayOption(option);
    setShowInDiv1(null);
    setShowOverlayOptions(false);
  };

  const goToHome = () => {
    navigate('/');
  };

  const showCameraInDiv1 = (camera, e) => {
    if (e) e.stopPropagation();
    setShowInDiv1(camera);
    setSelectedOverlayOption('B');
    setTimeout(() => {
      const videoElement = fullViewRefs[camera].current;
      if (videoElement && cameraStreams[camera] && !videoElement.srcObject) {
        videoElement.srcObject = cameraStreams[camera];
        videoElement.play().catch(err => console.error(`Error playing full view ${camera}:`, err));
      }
    }, 0);
  };

  const toggleButtonDropdown = (menuName) => {
    if (expandedButton === menuName) {
      setExpandedButton(null);
      setDiv2Content('camera');
      setShowAllOptions(true);
      setShowMainMenu(false);
      setCameraVisibility(true);
    } else {
      setExpandedButton(menuName);
      setDiv2Content(menuName);
      setShowMainMenu(false);
      setShowAllOptions(false);
      setCameraVisibility(menuName === 'camera');
    }
  };

  const goBackToMainMenu = () => {
    setActiveSubmenu(null);
    setExpandedButton(null);
    setShowAllOptions(true);
    setShowMainMenu(true);
    setCameraVisibility(false);
  };

  const toggleBluetoothDropdown = () => {
    setShowBluetoothDropdown(!showBluetoothDropdown);
    setHideToggleButton(!showBluetoothDropdown);
  };

  const handleBluetoothConnection = (isConnected) => {
    setIsBluetoothConnected(isConnected);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('.div2')) return;
      if (showBluetoothDropdown && !event.target.closest('.bluetooth-dropdown')) {
        setShowBluetoothDropdown(false);
        setHideToggleButton(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showBluetoothDropdown]);

  const CameraView = ({ camera, fullView = false }) => {
    const ref = fullView ? fullViewRefs[camera] : cameraRefs[camera];

    useEffect(() => {
      const videoElement = ref.current;
      if (videoElement && cameraStreams[camera] && !videoElement.srcObject) {
        videoElement.srcObject = cameraStreams[camera];
        videoElement.play().catch(err => console.error(`Error playing ${camera}:`, err));
      }
    }, [cameraStreams[camera]]);

    return (
      <div className={`camera-box ${fullView ? 'full-view' : ''}`}>
        <div className="camera-header">
          <span>Cam {camera}</span>
        </div>
        <div className="camera-feed">
          {cameraStreams[camera] ? (
            <video ref={ref} autoPlay playsInline muted />
          ) : (
            <div className="camera-placeholder">Cam {camera} not connected</div>
          )}
        </div>
      </div>
    );
  };

  const CameraButton = ({ camera }) => {
    return (
      <button 
        onClick={(e) => showCameraInDiv1(camera, e)} 
        className={`camera-button ${showInDiv1 === camera ? 'active' : ''}`}
      >
        Cam {camera}
      </button>
    );
  };

  const renderDiv2Content = () => {
    const renderCameraGrid = () => (
      <div className="camera-grid" style={{ display: cameraVisibility ? 'grid' : 'none' }}>
        {['A', 'B', 'C', 'D', 'E', 'F'].map(cam => (
          <CameraView key={cam} camera={cam} />
        ))}
      </div>
    );

    switch (div2Content) {
      case 'camera':
        return (
          <>
            {renderCameraGrid()}
          </>
        );
      case 'remote':
        return (
          <>
            <div className="remote-controls">
              {['A', 'B', 'C', 'D'].map(remote => (
                <button key={remote} className="control-button">Remote {remote}</button>
              ))}
            </div>
            {renderCameraGrid()}
          </>
        );
      case 'numeric':
        return (
          <>
            <div className="numeric-controls">
              {['A', 'B', 'C', 'D'].map(num => (
                <button key={num} className="control-button">Numeric {num}</button>
              ))}
            </div>
            {renderCameraGrid()}
          </>
        );
      case 'bluetooth':
        return (
          <>
            <BluetoothControls onConnectionChange={handleBluetoothConnection} />
            {renderCameraGrid()}
          </>
        );
      case 'operation-logs':
        return (
          <>
            <div className="logs-content">
              {['Operation started', 'Position changed', 'Operation completed'].map((log, i) => (
                <p key={i}>Log entry {i+1}: {log}</p>
              ))}
            </div>
            {renderCameraGrid()}
          </>
        );
      case 'alert-logs':
        return (
          <>
            <div className="logs-content">
              {['Wind speed high', 'Battery low', 'System update required'].map((alert, i) => (
                <p key={i} className="alert-item">{i === 0 ? 'Warning' : i === 1 ? 'Notice' : 'Alert'}: {alert}</p>
              ))}
            </div>
            {renderCameraGrid()}
          </>
        );
      default:
        return (
          <>
            <div className="camera-buttons-grid">
              {['A', 'B', 'C', 'D', 'E', 'F'].map(cam => (
                <CameraButton key={cam} camera={cam} />
              ))}
            </div>
            {renderCameraGrid()}
          </>
        );
    }
  };

  const renderMainMenu = () => (
    <div className="main-menu">
      {['camera', 'remote', 'numeric', 'operation-logs', 'alert-logs'].map((menu, i) => (
        <button 
          key={i}
          onClick={() => toggleButtonDropdown(menu)} 
          className="menu-button"
        >
          {menu === 'camera' ? 'All Camera View' : 
           menu.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </button>
      ))}
    </div>
  );

  const renderOverlayContent = () => {
    if (showInDiv1) {
      return (
        <div className="overlay-content full-camera-view">
          <div className="full-camera-header">
            <h3>Camera {showInDiv1} Full View</h3>
            <button onClick={() => setShowInDiv1(null)} className="back-button">
              <ChevronLeft size={20} /> Back
            </button>
          </div>
          <CameraView camera={showInDiv1} fullView={true} />
        </div>
      );
    }

    switch (selectedOverlayOption) {
      case 'A':
        return (
          <div className="overlay-content">
            <h3>3D View Content</h3>
            <p>This would display your 3D visualization of the crane</p>
          </div>
        );
      case 'B':
        return (
          <div className="overlay-content">
            <h3>Camera Views</h3>
            <p>Click on a camera button to view it in full screen</p>
            <div className="camera-buttons-row">
              {['A', 'B', 'C', 'D', 'E', 'F'].map(cam => (
                <button 
                  key={cam}
                  onClick={() => setShowInDiv1(cam)} 
                  className="camera-select-button"
                >
                  Cam {cam}
                </button>
              ))}
            </div>
          </div>
        );
      case 'C':
        return (
          <div className="overlay-content">
            <h3>Jib Analysis</h3>
            <p>Jib stress analysis and metrics would appear here</p>
          </div>
        );
      case 'D':
        return (
          <div className="overlay-content">
            <h3>Object Data and Properties</h3>
            <div className="object-properties">
              <p>Load: 500kg</p>
              <p>Height: 30m</p>
              <p>Angle: 45°</p>
            </div>
          </div>
        );
      default:
        return <img src={craneImage} alt="crane" />;
    }
  };

  return (
    <div className="parent">
      <div className="div3">
        <button onClick={goToHome} className="back-button">
          <CornerUpLeft size={20} />
        </button>
        <button>{force}</button>
        <button>{wind}</button>
        <button>Motor</button>
        
        <div className="bluetooth-dropdown">
          <button 
            onClick={toggleBluetoothDropdown}
            className={`bluetooth-toggle ${showBluetoothDropdown ? 'active' : ''}`}
          >
            <span className="connection-indicator" style={{ 
              backgroundColor: isBluetoothConnected ? '#4CAF50' : '#f44336' 
            }} />
            Connect to Model 
            {showBluetoothDropdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {showBluetoothDropdown && (
            <div className="bluetooth-dropdown-content">
              <BluetoothControls onConnectionChange={handleBluetoothConnection} />
            </div>
          )}
        </div>
      </div>

      <div className="div1">
        {renderOverlayContent()}
        
        <div className="overlay-menu">
          <button onClick={toggleOverlayOptions} className="overlay-toggle-button">
            {showOverlayOptions ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          {showOverlayOptions && (
            <div className="overlay-options">
              {['A', 'B', 'C', 'D'].map((option, i) => (
                <button 
                  key={i}
                  onClick={() => handleOptionClick(option)}
                >
                  {option === 'A' ? '3D View' : 
                   option === 'B' ? 'Camera Views' : 
                   option === 'C' ? 'Jib Analysis' : 
                   'Object Data and properties'}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="div2">
        {!hideToggleButton && (
          <button onClick={toggleContent} className="toggle-button">
            {showMainMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}

        <div className="div2-content-container">
          <div className={`div2-background-content ${showMainMenu ? 'blurred' : ''}`}>
            {renderDiv2Content()}
          </div>

          <div className={`hidden-content-overlay ${showMainMenu ? 'active' : ''}`}>
            {renderMainMenu()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToolkitPage;