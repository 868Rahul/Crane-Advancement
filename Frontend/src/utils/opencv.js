import React, { useState, useEffect, useRef } from 'react';
import './ToolkitPage.css';

function ToolkitPage() {
  // ... (keep all your existing state declarations)

  // Refs for video elements
  const cameraRefs = {
    A: useRef(null),
    B: useRef(null),
    C: useRef(null),
    D: useRef(null),
    E: useRef(null),
    F: useRef(null),
  };

  // Updated camera initialization
  useEffect(() => {
    const initializeCameras = async () => {
      try {
        // Get all available camera devices
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        if (videoDevices.length === 0) {
          console.warn('No cameras found');
          return;
        }

        // Initialize each camera with its own stream
        const streams = {};
        const cameraIds = ['A', 'B', 'C', 'D', 'E', 'F'];
        
        for (let i = 0; i < Math.min(videoDevices.length, cameraIds.length); i++) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              video: { 
                deviceId: videoDevices[i].deviceId,
                width: 320,
                height: 240
              }
            });
            streams[cameraIds[i]] = stream;
          } catch (err) {
            console.error(`Error initializing camera ${cameraIds[i]}:`, err);
            streams[cameraIds[i]] = null;
          }
        }

        // Fill remaining cameras with null if we have fewer than 6 cameras
        for (let i = videoDevices.length; i < cameraIds.length; i++) {
          streams[cameraIds[i]] = null;
        }

        setCameraStreams(streams);
      } catch (err) {
        console.error('Error initializing cameras:', err);
        setCameraStreams({
          A: null,
          B: null,
          C: null,
          D: null,
          E: null,
          F: null,
        });
      }
    };

    initializeCameras();

    return () => {
      // Cleanup all camera streams
      Object.values(cameraStreams).forEach(stream => {
        if (stream?.getTracks) {
          stream.getTracks().forEach(track => track.stop());
        }
      });
    };
  }, []);

  // CameraView component remains exactly the same as before
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

  // ... (keep all your other existing code exactly the same)
}