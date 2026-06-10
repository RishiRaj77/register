import React, { useState, useRef, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

// States: IDLE, CAMERA, GENERATING, RESULT
function AvatarCard({ styleName, defaultImage }) {
  const [state, setState] = useState('IDLE');
  const [stream, setStream] = useState(null);
  const [persona, setPersona] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [error, setError] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const [finalImage, setFinalImage] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Cleanup stream on unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      setStream(mediaStream);
      setState('CAMERA');
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Could not access camera. Please check permissions.");
    }
  };

  const processImageRequest = async (imageBase64) => {
    setState('GENERATING');
    try {
      const response = await fetch('http://localhost:3001/api/avatar/generate-avatar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imageBase64, style: styleName })
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to generate persona');
      
      setPersona(data.persona);
      setFinalImage(data.generatedImage || imageBase64); // Use generated or fallback to captured
      setState('RESULT');
    } catch (err) {
      console.error("API Error:", err);
      setError(err.message);
      setState('IDLE');
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageBase64 = event.target.result;
      setCapturedImage(imageBase64);
      processImageRequest(imageBase64);
    };
    reader.readAsDataURL(file);
  };

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imageBase64 = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedImage(imageBase64);
    
    // Stop camera
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    
    processImageRequest(imageBase64);
  };

  const handleDownload = () => {
    const src = finalImage || capturedImage || defaultImage;
    if (src && src.startsWith('http')) {
      // For external URLs (Pollinations), open in new tab so user can save
      window.open(src, '_blank');
    } else {
      const a = document.createElement('a');
      a.href = src;
      a.download = `${styleName.toLowerCase()}_avatar.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const reset = () => {
    setState('IDLE');
    setPersona(null);
    setCapturedImage(null);
    setFinalImage(null);
    setImageLoaded(false);
    setError(null);
  };

  return (
    <div className="dashboard-card avatar-interactive-card">
      {state === 'IDLE' && (
        <div className="avatar-idle-view">
          <img src={defaultImage} alt={`${styleName} Avatar`} className="avatar-image" />
          <p className="avatar-label">{styleName}</p>
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px', justifyContent: 'center' }}>
            <button className="btn-action" style={{ fontSize: '13px', padding: '8px 16px', flex: 1 }} onClick={() => fileInputRef.current.click()}>
              Upload
            </button>
            <button className="btn-action" style={{ fontSize: '13px', padding: '8px 16px', flex: 1 }} onClick={startCamera}>
              Capture
            </button>
          </div>

          {error && (
            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <p className="error-text" style={{color: '#dc2626', fontSize: '12px', margin: '0 0 8px 0', textAlign: 'center'}}>{error}</p>
            </div>
          )}
        </div>
      )}

      {state === 'CAMERA' && (
        <div className="avatar-camera-view">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted
            className="avatar-video"
            onLoadedMetadata={() => videoRef.current && videoRef.current.play()}
          />
          <button className="btn-capture" onClick={capturePhoto}>Capture Photo</button>
        </div>
      )}

      {state === 'GENERATING' && (
        <div className="avatar-generating-view">
          <div className="spinner"></div>
          <p className="generating-text">Gemini AI is creating your avatar...</p>
          <p style={{fontSize: '11px', color: '#9ca3af', marginTop: '4px'}}>This may take 10-20 seconds</p>
        </div>
      )}

      {state === 'RESULT' && (
        <div className="avatar-result-view">
          <div className="result-image-container" style={{position: 'relative'}}>
            {!imageLoaded && (
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px'}}>
                <div className="spinner"></div>
                <p style={{fontSize: '12px', color: '#6b7280', marginTop: '8px'}}>Loading your avatar...</p>
              </div>
            )}
            <img
              src={finalImage || capturedImage || defaultImage}
              alt="Generated Avatar"
              className="avatar-image-small"
              style={{display: imageLoaded ? 'block' : 'none'}}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
            />
          </div>
          
          <div className="result-actions">
            <button className="btn-action btn-download" onClick={handleDownload}>Download</button>
            <div className="qr-container" title="Scan to view">
              <QRCodeSVG value={window.location.origin} size={64} />
            </div>
          </div>
          
          <button className="btn-text-only" onClick={reset}>Try Again</button>
        </div>
      )}
      
      {/* Hidden inputs */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileUpload} />
    </div>
  );
}

export default AvatarCard;
