import React, { useState, useEffect, useRef } from 'react';
import './ToolkitPage.css';
import { Menu, X, CornerUpLeft, ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';
import craneImage from '../assets/Crane.jpg';
import { useNavigate } from 'react-router-dom';
import BluetoothControls from './BluetoothControl.jsx';

function ToolkitPage() {
  const [showContent, setShowContent] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeCameras, setActiveCameras] = useState({
    A: false,
    B: false,
    C: false,
    D: false
  });
  const [showOverlayOptions, setShowOverlayOptions] = useState(false);
  const [selectedOverlayOption, setSelectedOverlayOption] = useState(null);
  const [showBluetoothDropdown, setShowBluetoothDropdown] = useState(false);

  // Refs for video elements
  const cameraRefs = {
    A: useRef(null),
    B: useRef(null),
    C: useRef(null),
    D: useRef(null),
  };

  const navigate = useNavigate();

  // Toggle camera feeds
  const toggleCamera = (camera) => {
    if (activeCameras[camera] && cameraRefs[camera].current?.srcObject) {
      const stream = cameraRefs[camera].current.srcObject;
      stream.getTracks().forEach(track => track.stop());
      cameraRefs[camera].current.srcObject = null;
    }

    setActiveCameras(prev => ({
      ...prev,
      [camera]: !prev[camera]
    }));
  };

  // Handle webcam access
  useEffect(() => {
    const startCamera = async (camera) => {
      if (activeCameras[camera] && cameraRefs[camera].current) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 320, height: 240 }
          });

          if (cameraRefs[camera].current && activeCameras[camera]) {
            cameraRefs[camera].current.srcObject = stream;
          } else {
            stream.getTracks().forEach(track => track.stop());
          }
        } catch (err) {
          console.error(`Error accessing camera ${camera}:`, err);
        }
      }
    };

    Object.keys(activeCameras).forEach(camera => {
      if (activeCameras[camera]) startCamera(camera);
    });

    return () => {
      Object.keys(cameraRefs).forEach(camera => {
        if (cameraRefs[camera].current?.srcObject) {
          const stream = cameraRefs[camera].current.srcObject;
          stream.getTracks().forEach(track => track.stop());
          cameraRefs[camera].current.srcObject = null;
        }
      });
    };
  }, [activeCameras]);

  const toggleContent = () => {
    if (showContent) {
      Object.keys(cameraRefs).forEach(camera => {
        if (cameraRefs[camera].current?.srcObject) {
          const stream = cameraRefs[camera].current.srcObject;
          stream.getTracks().forEach(track => track.stop());
          cameraRefs[camera].current.srcObject = null;
        }
      });

      setActiveCameras({
        A: false,
        B: false,
        C: false,
        D: false
      });
      setActiveSubmenu(null);
    }
    setShowContent(!showContent);
  };

  const toggleOverlayOptions = () => {
    setShowOverlayOptions(!showOverlayOptions);
  };

  const handleOptionClick = (option) => {
    setSelectedOverlayOption(option);
    setShowOverlayOptions(false);
  };

  const goToHome = () => {
    navigate('/');
  };

  const openSubmenu = (menuName) => {
    setActiveSubmenu(menuName);
  };

  const goBackToMainMenu = () => {
    Object.keys(cameraRefs).forEach(camera => {
      if (cameraRefs[camera].current?.srcObject) {
        const stream = cameraRefs[camera].current.srcObject;
        stream.getTracks().forEach(track => track.stop());
        cameraRefs[camera].current.srcObject = null;
      }
    });

    setActiveCameras({
      A: false,
      B: false,
      C: false,
      D: false
    });
    setActiveSubmenu(null);
  };

  const toggleBluetoothDropdown = () => {
    setShowBluetoothDropdown(!showBluetoothDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showBluetoothDropdown && !event.target.closest('.bluetooth-dropdown')) {
        setShowBluetoothDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showBluetoothDropdown]);

  // Camera view component
  const CameraView = ({ camera }) => {
    return (
      <div className={`camera-box ${activeCameras[camera] ? 'active' : ''}`}>
        <div className="camera-header">
          <span>Cam {camera}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCamera(camera);
            }}
            className="camera-toggle-btn"
          >
            {activeCameras[camera] ? 'Turn Off' : 'Turn On'}
          </button>
        </div>
        <div className="camera-feed">
          {activeCameras[camera] ? (
            <video ref={cameraRefs[camera]} autoPlay playsInline muted />
          ) : (
            <div className="camera-placeholder">Cam {camera} inactive</div>
          )}
        </div>
      </div>
    );
  };

  // Render submenu
  const renderSubMenu = () => {
    switch (activeSubmenu) {
      case 'camera':
        return (
          <div className="submenu">
            <div className="submenu-header">
              <button onClick={goBackToMainMenu} className="back-button">
                <ChevronLeft size={20} /> All Camera Views
              </button>
            </div>
            <div className="camera-grid">
              <CameraView camera="A" />
              <CameraView camera="B" />
              <CameraView camera="C" />
              <CameraView camera="D" />
            </div>
          </div>
        );
      case 'remote':
        return (
          <div className="submenu">
            <div className="submenu-header">
              <button onClick={goBackToMainMenu} className="back-button">
                <ChevronLeft size={20} /> Remote Controls
              </button>
            </div>
            <button>Remote A</button>
            <button>Remote B</button>
            <button>Remote C</button>
            <button>Remote D</button>
          </div>
        );
      case 'numeric':
        return (
          <div className="submenu">
            <div className="submenu-header">
              <button onClick={goBackToMainMenu} className="back-button">
                <ChevronLeft size={20} /> Numeric Controls
              </button>
            </div>
            <button>Numeric A</button>
            <button>Numeric B</button>
            <button>Numeric C</button>
            <button>Numeric D</button>
          </div>
        );
      case 'bluetooth':
        return (
          <div className="submenu">
            <div className="submenu-header">
              <button onClick={goBackToMainMenu} className="back-button">
                <ChevronLeft size={20} /> Bluetooth Controls
              </button>
            </div>
            <BluetoothControls />
          </div>
        );
      default:
        return (
          <div className="main-menu">
            <button onClick={() => openSubmenu('camera')}>All Camera views</button>
            <button onClick={() => openSubmenu('remote')}>Remote Controls</button>
            <button onClick={() => openSubmenu('numeric')}>Numeric Controls</button>
            <button onClick={() => openSubmenu('bluetooth')}>Bluetooth Controls</button>
            <button>Operation logs</button>
            <button>Alert Logs</button>
          </div>
        );
    }
  };

  // Render overlay content
  const renderOverlayContent = () => {
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
            <h3>Single Camera View</h3>
            <div className="single-camera-view">
              <CameraView camera="A" />
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
      {/* Header/Navbar */}
      <div className="div3">
        <button onClick={goToHome} className="back-button">
          <CornerUpLeft size={20} />
        </button>
        <button>Force</button>
        <button>Wind</button>
        <button>Motor</button>
        
        {/* Bluetooth Dropdown */}
        <div className="bluetooth-dropdown">
          <button 
            onClick={toggleBluetoothDropdown}
            className={`bluetooth-toggle ${showBluetoothDropdown ? 'active' : ''}`}
          >
            Bluetooth Controls
            {showBluetoothDropdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {showBluetoothDropdown && (
            <div className="bluetooth-dropdown-content">
              <BluetoothControls />
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="div1">
        {renderOverlayContent()}
        
        {/* Overlay Menu Button */}
        <div className="overlay-menu">
          <button onClick={toggleOverlayOptions} className="overlay-toggle-button">
            {showOverlayOptions ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          {showOverlayOptions && (
            <div className="overlay-options">
              <button onClick={() => handleOptionClick('A')}>3D View</button>
              <button onClick={() => handleOptionClick('B')}>Single Camera View</button>
              <button onClick={() => handleOptionClick('C')}>Jib Analysis</button>
              <button onClick={() => handleOptionClick('D')}>Object Data and properties</button>
            </div>
          )}
        </div>
      </div>

      {/* Side Menu */}
      <div className="div2">
        <button onClick={toggleContent} className="toggle-button">
          {showContent ? <X size={20} /> : <Menu size={20} />}
        </button>

        {showContent && (
          <div className="hidden-content">
            {renderSubMenu()}
          </div>
        )}
      </div>
    </div>
  );
}

export default ToolkitPage;