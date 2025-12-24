import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import FileUpload from '../components/FileUpload';
import DocPreview from '../components/DocPreview';
import ExtractedFields from '../components/ExtractedFields';

// Constants for production
const POPUP_DURATION = 3000;
const ANIMATION_FPS = 60;

// Error boundary component for production
class OCRErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('OCR Error Boundary caught an error:', error, errorInfo);
    // In production, you would send this to your error tracking service
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-6">
              We encountered an unexpected error. Please refresh the page and try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const DocOCR = () => {
  // State management with proper typing
  const [file, setFile] = useState(null);
  const [extracted, setExtracted] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ title: '', message: '', type: 'info' });

  // Refs for performance
  const timeoutRef = useRef(null);



  // Optimized handlers with proper error handling
  const handleOcrText = useCallback((jsonData, summary) => {
    try {
      setExtracted(jsonData);
      setSummary(summary);
      setLoading(false);
      setError('');
      
      // Show success popup
      setPopupContent({
        title: '✅ Analysis Complete',
        message: 'Financial data has been successfully extracted and analyzed!',
        type: 'success'
      });
      setShowPopup(true);
      
      // Clear timeout if exists
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => setShowPopup(false), POPUP_DURATION);
    } catch (error) {
      console.error('Error handling OCR text:', error);
      setError('Failed to process the extracted data. Please try again.');
      setLoading(false);
    }
  }, []);

  const handleFileChange = useCallback((newFile) => {
    try {
      setFile(newFile);
      setExtracted(null);
      setSummary('');
      setError('');
      
      // Show file upload popup
      setPopupContent({
        title: '📄 File Selected',
        message: `${newFile.name} has been uploaded successfully.`,
        type: 'info'
      });
      setShowPopup(true);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => setShowPopup(false), POPUP_DURATION);
    } catch (error) {
      console.error('Error handling file change:', error);
      setError('Failed to process the uploaded file. Please try again.');
    }
  }, []);

  const handleError = useCallback((errorMessage) => {
    setError(errorMessage);
    setLoading(false);
    
    // Show error popup
    setPopupContent({
      title: '❌ Error Occurred',
      message: errorMessage,
      type: 'error'
    });
    setShowPopup(true);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => setShowPopup(false), POPUP_DURATION);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Custom styles for snake cursor and effects (same as Hero)
  const customStyles = `
    /* Snake cursor effect */
    .snake-cursor {
      position: fixed;
      width: 16px;
      height: 16px;
      background: linear-gradient(45deg, #86efac, #4ade80);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: all 0.1s ease;
      box-shadow: 0 0 15px rgba(74, 222, 128, 0.4);
      opacity: 1;
    }
    

    
    /* Popup animations */
    .popup-enter {
      animation: popupSlideIn 0.3s ease-out;
    }
    .popup-exit {
      animation: popupSlideOut 0.3s ease-in;
    }
    @keyframes popupSlideIn {
      from {
        opacity: 0;
        transform: translateY(-20px) scale(0.9);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    @keyframes popupSlideOut {
      from {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      to {
        opacity: 0;
        transform: translateY(-20px) scale(0.9);
      }
    }
    
    /* Hover effects with light green */
    .hover-glow:hover {
      box-shadow: 0 0 20px rgba(74, 222, 128, 0.3);
      transform: translateY(-2px);
      transition: all 0.3s ease;
    }
    
    /* Light green gradient backgrounds */
    .light-green-gradient {
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%);
    }
    
    /* Animated border effect */
    .animated-border {
      position: relative;
      border: 2px solid transparent;
      background: linear-gradient(white, white) padding-box,
                  linear-gradient(45deg, #86efac, #4ade80, #22c55e) border-box;
      animation: border-rotate 3s linear infinite;
    }
    @keyframes border-rotate {
      0% { background: linear-gradient(white, white) padding-box,
                   linear-gradient(0deg, #86efac, #4ade80, #22c55e) border-box; }
      100% { background: linear-gradient(white, white) padding-box,
                   linear-gradient(360deg, #86efac, #4ade80, #22c55e) border-box; }
    }
    
    /* Floating animation for cards */
    .float-animation {
      animation: float 3s ease-in-out infinite;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    /* Pulse effect for important elements */
    .pulse-effect {
      animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }
  `;

  // Helper functions for popup icons and colors
  const getPopupIcon = (type) => {
    switch (type) {
      case 'success':
        return (
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
      case 'info':
      default:
        return (
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  const getPopupColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      case 'info':
      default:
        return 'text-blue-600';
    }
  };

  return (
    <OCRErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex flex-col items-center py-10 relative">
        {/* Custom styles */}
        <style>{customStyles}</style>
        
        {/* Snake cursor */}


        {/* Visual Popup */}
        {showPopup && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            role="dialog"
            aria-labelledby="popup-title"
            aria-describedby="popup-message"
          >
            <div className={`bg-white rounded-xl p-6 max-w-sm w-full mx-4 animated-border popup-enter`}>
              {getPopupIcon(popupContent.type)}
              <h3 id="popup-title" className="mt-4 text-lg font-semibold text-center">{popupContent.title}</h3>
              <p id="popup-message" className="mt-2 text-sm text-gray-600 text-center">{popupContent.message}</p>
              <button
                onClick={() => setShowPopup(false)}
                className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-2 px-4 rounded-lg transition-all duration-200 hover-glow"
                aria-label="Close popup"
              >
                Got it!
              </button>
            </div>
          </div>
        )}

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-green-700 float-animation">
            Finance Document OCR Reader
          </h1>
          <p className="text-gray-600 max-w-2xl text-lg">
            Upload financial documents like bank statements, invoices, or receipts to automatically extract and analyze financial data using AI.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-6xl animated-border hover-glow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Upload and Preview */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 pulse-effect">📤 Upload Document</h2>
                <FileUpload onOcrText={handleOcrText} onFileChange={handleFileChange} onError={handleError} />
              </div>
              
              {file && (
                <div className="light-green-gradient rounded-lg p-4 hover-glow">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">📄 Document Preview</h3>
                  <DocPreview file={file} />
                </div>
              )}
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800 pulse-effect">📊 Extracted Financial Data</h2>
                
                {loading && (
                  <div className="flex items-center justify-center p-8 light-green-gradient rounded-lg">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4" role="status" aria-label="Loading">
                        <span className="sr-only">Loading...</span>
                      </div>
                      <p className="text-green-600 font-medium">Analyzing financial data...</p>
                    </div>
                  </div>
                )}
                
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 hover-glow" role="alert">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {!loading && !error && extracted && (
                  <div className="light-green-gradient rounded-lg p-4 hover-glow">
                    <ExtractedFields json={extracted} summary={summary} />
                  </div>
                )}
                
                {!loading && !error && !extracted && (
                  <div className="text-center p-8 text-gray-500 light-green-gradient rounded-lg hover-glow">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4 float-animation" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-lg">Upload a financial document to extract data</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </OCRErrorBoundary>
  );
};

export default DocOCR;