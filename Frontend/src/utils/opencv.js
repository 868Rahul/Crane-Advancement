// src/utils/opencv-utils.js

// Check if OpenCV is loaded
export const isOpenCVLoaded = () => {
    return typeof cv !== 'undefined';
  };
  
  // Process video frame with OpenCV
  export const processFrame = (videoElement, canvasElement) => {
    if (!isOpenCVLoaded()) return;
    
    try {
      const src = new cv.Mat(videoElement.height, videoElement.width, cv.CV_8UC4);
      const dst = new cv.Mat(videoElement.height, videoElement.width, cv.CV_8UC4);
      const cap = new cv.VideoCapture(videoElement);
      
      cap.read(src);
      
      // Apply processing (e.g., edge detection)
      cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY);
      cv.Canny(src, dst, 50, 100);
      
      // Display result
      cv.imshow(canvasElement, dst);
      
      // Clean up
      src.delete();
      dst.delete();
    } catch (err) {
      console.error('Error processing frame:', err);
    }
  };