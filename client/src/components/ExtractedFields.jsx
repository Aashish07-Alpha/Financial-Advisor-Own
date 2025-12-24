import React, { useState, useEffect } from 'react';

const ExtractedFields = ({ json, summary }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState('');
  const [audioSettings, setAudioSettings] = useState({
    volume: 1.0,
    rate: 0.9,
    pitch: 1.0
  });
  const [showAudioSettings, setShowAudioSettings] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [currentUtterance, setCurrentUtterance] = useState(null);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Snake cursor effect - moved to top before any conditional returns
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!json) return null;

  // Custom slider styles with light green effects
  const sliderStyles = `
    .slider::-webkit-slider-thumb {
      appearance: none;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: linear-gradient(45deg, #4ade80, #22c55e);
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
      transition: all 0.3s ease;
    }
    .slider::-webkit-slider-thumb:hover {
      transform: scale(1.2);
      box-shadow: 0 4px 12px rgba(34, 197, 94, 0.5);
    }
    .slider::-moz-range-thumb {
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: linear-gradient(45deg, #4ade80, #22c55e);
      cursor: pointer;
      border: none;
      box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
      transition: all 0.3s ease;
    }
    .slider::-moz-range-thumb:hover {
      transform: scale(1.2);
      box-shadow: 0 4px 12px rgba(34, 197, 94, 0.5);
    }
    .slider::-webkit-slider-track {
      background: linear-gradient(90deg, #dcfce7, #bbf7d0);
      border-radius: 8px;
      height: 6px;
    }
    .slider::-moz-range-track {
      background: linear-gradient(90deg, #dcfce7, #bbf7d0);
      border-radius: 8px;
      height: 6px;
      border: none;
    }
    
    /* Snake cursor effect */
    .snake-cursor {
      position: fixed;
      width: 20px;
      height: 20px;
      background: linear-gradient(45deg, #4ade80, #22c55e);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: all 0.1s ease;
      box-shadow: 0 0 20px rgba(34, 197, 94, 0.6);
      opacity: 0;
    }
    .snake-cursor.active {
      opacity: 1;
      transform: scale(1.5);
    }
    
    /* Light green glow effects */
    .glow-effect {
      position: relative;
      overflow: hidden;
    }
    .glow-effect::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%);
      animation: glow-pulse 3s ease-in-out infinite;
      pointer-events: none;
    }
    @keyframes glow-pulse {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(1.1); }
    }
    
    /* Hover effects with light green */
    .hover-glow:hover {
      box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
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
                  linear-gradient(45deg, #4ade80, #22c55e, #16a34a) border-box;
      animation: border-rotate 3s linear infinite;
    }
    @keyframes border-rotate {
      0% { background: linear-gradient(white, white) padding-box,
                   linear-gradient(0deg, #4ade80, #22c55e, #16a34a) border-box; }
      100% { background: linear-gradient(white, white) padding-box,
                   linear-gradient(360deg, #4ade80, #22c55e, #16a34a) border-box; }
    }
  `;

  const generateSpeechText = () => {
    let speechText = `Analysis Complete. `;
    
    // Read the summary from the Analysis Complete section
    if (summary) {
      speechText += `Summary: ${summary}. `;
    }
    
    // Document type
    speechText += `Document type: ${json.documentType || 'Financial Document'}. `;
    
    // Word and character count
    speechText += `Extracted ${json.wordCount || 0} words and ${json.characterCount || 0} characters. `;
    
    // Financial keywords
    if (json.analysis?.financialKeywords?.length > 0) {
      speechText += `Financial keywords found: ${json.analysis.financialKeywords.join(', ')}. `;
    }
    
    // Potential amounts
    if (json.analysis?.potentialAmounts?.length > 0) {
      speechText += `Monetary amounts detected: ${json.analysis.potentialAmounts.join(', ')}. `;
    }
    
    // Dates
    if (json.analysis?.dates?.length > 0) {
      speechText += `Dates found: ${json.analysis.dates.join(', ')}. `;
    }
    
    // Account information
    if (json.analysis?.accountInfo) {
      const accountInfo = json.analysis.accountInfo;
      if (accountInfo.accountNumber) {
        speechText += `Account number: ${accountInfo.accountNumber}. `;
      }
      if (accountInfo.accountHolder) {
        speechText += `Account holder: ${accountInfo.accountHolder}. `;
      }
      if (accountInfo.institution) {
        speechText += `Institution: ${accountInfo.institution}. `;
      }
    }
    
    // Balances
    if (json.analysis?.balances) {
      const balances = json.analysis.balances;
      if (balances.opening) {
        speechText += `Opening balance: ${balances.opening}. `;
      }
      if (balances.closing) {
        speechText += `Closing balance: ${balances.closing}. `;
      }
      if (balances.current) {
        speechText += `Current balance: ${balances.current}. `;
      }
    }
    
    // Totals
    if (json.analysis?.totals) {
      const totals = json.analysis.totals;
      if (totals.deposits) {
        speechText += `Total deposits: ${totals.deposits}. `;
      }
      if (totals.withdrawals) {
        speechText += `Total withdrawals: ${totals.withdrawals}. `;
      }
      if (totals.fees) {
        speechText += `Total fees: ${totals.fees}. `;
      }
      if (totals.interest) {
        speechText += `Total interest: ${totals.interest}. `;
      }
    }
    
    // Transactions
    if (json.analysis?.transactions?.length > 0) {
      speechText += `Found ${json.analysis.transactions.length} transactions. `;
      json.analysis.transactions.forEach((transaction, index) => {
        speechText += `Transaction ${index + 1}: ${transaction.description} on ${transaction.date} for ${transaction.amount}. `;
      });
    }
    
    // Summary
    if (json.analysis?.summary) {
      speechText += `Analysis summary: ${json.analysis.summary}. `;
    }
    
    speechText += `Analysis complete.`;
    
    return speechText;
  };

  const handlePlayAudio = async () => {
    try {
      setAudioError('');
      
      // Stop any existing speech first
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      // Small delay to ensure previous speech is fully cancelled
      await new Promise(resolve => setTimeout(resolve, 100));
      
      setIsPlaying(true);
      
      const speechText = generateSpeechText();
      
      // Use Web Speech API
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(speechText);
        utterance.rate = audioSettings.rate;
        utterance.pitch = audioSettings.pitch;
        utterance.volume = audioSettings.volume;
        
        // Load voices if not already loaded
        let voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) {
          // Wait for voices to load
          await new Promise((resolve) => {
            window.speechSynthesis.onvoiceschanged = () => {
              voices = window.speechSynthesis.getVoices();
              resolve();
            };
            // Timeout after 1 second if voices don't load
            setTimeout(resolve, 1000);
          });
        }
        
        // Try to use a female voice if available
        const femaleVoice = voices.find(voice => 
          voice.name.includes('female') || 
          voice.name.includes('Female') ||
          voice.name.includes('Samantha') ||
          voice.name.includes('Victoria') ||
          voice.name.includes('Zira')
        );
        if (femaleVoice) {
          utterance.voice = femaleVoice;
        }
        
        utterance.onend = () => {
          setIsPlaying(false);
          setCurrentUtterance(null);
        };
        
        utterance.onerror = (event) => {
          // Ignore "interrupted" and "canceled" errors as they're expected when user stops playback
          if (event.error === 'interrupted' || event.error === 'canceled') {
            console.log('Speech interrupted by user');
            setIsPlaying(false);
            setCurrentUtterance(null);
            return;
          }
          
          console.error('Speech synthesis error:', event);
          setAudioError('Audio playback failed. Please try again.');
          setIsPlaying(false);
          setCurrentUtterance(null);
        };
        
        // Save current utterance reference
        setCurrentUtterance(utterance);
        
        // Speak the utterance
        window.speechSynthesis.speak(utterance);
      } else {
        throw new Error('Speech synthesis not supported');
      }
    } catch (error) {
      console.error('Audio error:', error);
      setAudioError('Audio feature not supported in this browser. Please use Chrome or Edge.');
      setIsPlaying(false);
      setCurrentUtterance(null);
    }
  };

  const handleStopAudio = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setAudioError('');
    setCurrentUtterance(null);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setAudioSettings(prev => ({ ...prev, volume: newVolume }));
  };

  const handleRateChange = (e) => {
    const newRate = parseFloat(e.target.value);
    setAudioSettings(prev => ({ ...prev, rate: newRate }));
  };

  const handlePitchChange = (e) => {
    const newPitch = parseFloat(e.target.value);
    setAudioSettings(prev => ({ ...prev, pitch: newPitch }));
  };

  const renderAnalysis = () => {
    if (json.analysis) {
      return (
        <div className="space-y-6">
          {/* Financial Keywords */}
          {json.analysis.financialKeywords && json.analysis.financialKeywords.length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-blue-800">Financial Keywords</h4>
                <span className="bg-blue-200 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                  {json.analysis.financialKeywords.length} found
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {json.analysis.financialKeywords.map((keyword, index) => (
                  <span key={index} className="bg-white text-blue-700 px-3 py-2 rounded-lg text-sm font-medium border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Potential Amounts */}
          {json.analysis.potentialAmounts && json.analysis.potentialAmounts.length > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200 shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-green-800">Monetary Amounts</h4>
                <span className="bg-green-200 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                  {json.analysis.potentialAmounts.length} amounts
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {json.analysis.potentialAmounts.map((amount, index) => (
                  <span key={index} className="bg-white text-green-700 px-3 py-2 rounded-lg text-sm font-mono font-medium border border-green-200 shadow-sm hover:shadow-md transition-shadow">
                    {amount}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Dates */}
          {json.analysis.dates && json.analysis.dates.length > 0 && (
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-purple-800">Important Dates</h4>
                <span className="bg-purple-200 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
                  {json.analysis.dates.length} dates
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {json.analysis.dates.map((date, index) => (
                  <span key={index} className="bg-white text-purple-700 px-3 py-2 rounded-lg text-sm font-medium border border-purple-200 shadow-sm hover:shadow-md transition-shadow">
                    {date}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Account Information */}
          {json.analysis.accountInfo && (
            <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200 shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-indigo-800">Account Information</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {json.analysis.accountInfo.accountNumber && (
                  <div className="bg-white rounded-lg p-4 border border-indigo-200 shadow-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-indigo-700">Account Number</span>
                    </div>
                    <p className="text-indigo-800 font-mono text-sm">{json.analysis.accountInfo.accountNumber}</p>
                  </div>
                )}
                {json.analysis.accountInfo.accountHolder && (
                  <div className="bg-white rounded-lg p-4 border border-indigo-200 shadow-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-indigo-700">Account Holder</span>
                    </div>
                    <p className="text-indigo-800 font-medium text-sm">{json.analysis.accountInfo.accountHolder}</p>
                  </div>
                )}
                {json.analysis.accountInfo.institution && (
                  <div className="bg-white rounded-lg p-4 border border-indigo-200 shadow-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-indigo-700">Institution</span>
                    </div>
                    <p className="text-indigo-800 font-medium text-sm">{json.analysis.accountInfo.institution}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Balances */}
          {json.analysis.balances && (
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200 shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-yellow-800">Account Balances</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {json.analysis.balances.opening && (
                  <div className="bg-white rounded-lg p-4 border border-yellow-200 shadow-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-yellow-700">Opening Balance</span>
                    </div>
                    <p className="text-yellow-800 font-mono font-bold text-lg">{json.analysis.balances.opening}</p>
                  </div>
                )}
                {json.analysis.balances.closing && (
                  <div className="bg-white rounded-lg p-4 border border-yellow-200 shadow-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-yellow-700">Closing Balance</span>
                    </div>
                    <p className="text-yellow-800 font-mono font-bold text-lg">{json.analysis.balances.closing}</p>
                  </div>
                )}
                {json.analysis.balances.current && (
                  <div className="bg-white rounded-lg p-4 border border-yellow-200 shadow-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-yellow-700">Current Balance</span>
                    </div>
                    <p className="text-yellow-800 font-mono font-bold text-lg">{json.analysis.balances.current}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Totals */}
          {json.analysis.totals && (
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200 shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-orange-800">Summary Totals</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {json.analysis.totals.deposits && (
                  <div className="bg-white rounded-lg p-4 border border-orange-200 shadow-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-orange-700">Total Deposits</span>
                    </div>
                    <p className="text-green-600 font-mono font-bold text-lg">{json.analysis.totals.deposits}</p>
                  </div>
                )}
                {json.analysis.totals.withdrawals && (
                  <div className="bg-white rounded-lg p-4 border border-orange-200 shadow-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-orange-700">Total Withdrawals</span>
                    </div>
                    <p className="text-red-600 font-mono font-bold text-lg">{json.analysis.totals.withdrawals}</p>
                  </div>
                )}
                {json.analysis.totals.fees && (
                  <div className="bg-white rounded-lg p-4 border border-orange-200 shadow-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-orange-700">Total Fees</span>
                    </div>
                    <p className="text-orange-600 font-mono font-bold text-lg">{json.analysis.totals.fees}</p>
                  </div>
                )}
                {json.analysis.totals.interest && (
                  <div className="bg-white rounded-lg p-4 border border-orange-200 shadow-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-orange-700">Total Interest</span>
                    </div>
                    <p className="text-green-600 font-mono font-bold text-lg">{json.analysis.totals.interest}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Transactions */}
          {json.analysis.transactions && json.analysis.transactions.length > 0 && (
            <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-6 border border-teal-200 shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-teal-800">Transactions</h4>
                <span className="bg-teal-200 text-teal-800 text-xs font-medium px-2 py-1 rounded-full">
                  {json.analysis.transactions.length} transactions
                </span>
              </div>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {json.analysis.transactions.map((transaction, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-teal-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className={`w-2 h-2 rounded-full ${transaction.amount.startsWith('-') || transaction.amount.startsWith('(') ? 'bg-red-500' : 'bg-green-500'}`}></div>
                          <p className="text-sm font-medium text-teal-800">{transaction.description}</p>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-teal-600">
                          <span className="flex items-center space-x-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            <span>{transaction.date}</span>
                          </span>
                          <span className="capitalize">{transaction.type}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-mono font-bold ${
                          transaction.amount.startsWith('-') || transaction.amount.startsWith('(') 
                            ? 'text-red-600' 
                            : 'text-green-600'
                        }`}>
                          {transaction.amount}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const renderDocumentInfo = () => {
    return (
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-gray-800 mb-3">📄 Document Information</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">Document Type:</span>
            <p className="text-gray-800">{json.documentType || 'Unknown'}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Word Count:</span>
            <p className="text-gray-800">{json.wordCount || 0} words</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Character Count:</span>
            <p className="text-gray-800">{json.characterCount || 0} characters</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Confidence:</span>
            <p className="text-gray-800">{json.confidence || 'Unknown'}</p>
          </div>
          {json.analysis && (
            <div>
              <span className="font-medium text-gray-600">Lines:</span>
              <p className="text-gray-800">{json.analysis.lineCount || 0} lines</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderExtractedText = () => {
    if (json.extractedText) {
      return (
        <div className="bg-white rounded-lg p-4 border">
          <h4 className="font-semibold text-gray-800 mb-3">📝 Extracted Text</h4>
          <div className="bg-gray-50 rounded p-3 max-h-40 overflow-y-auto">
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {json.extractedText}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderFallback = () => {
    // If the data structure is different, show a simplified view
    return (
      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">📋 Document Data</h4>
        <div className="space-y-2">
          {Object.entries(json).map(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
              return (
                <div key={key}>
                  <span className="font-medium text-yellow-700">{key}:</span>
                  <pre className="text-xs bg-white p-2 rounded mt-1 overflow-x-auto">
                    {JSON.stringify(value, null, 2)}
                  </pre>
                </div>
              );
            }
            return (
              <div key={key}>
                <span className="font-medium text-yellow-700">{key}:</span>
                <span className="text-yellow-800 ml-2">{String(value)}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Custom CSS for sliders and effects */}
      <style>{sliderStyles}</style>
      
      {/* Snake cursor */}
      <div 
        className={`snake-cursor ${isHovering ? 'active' : ''}`}
        style={{
          left: cursorPosition.x - 10,
          top: cursorPosition.y - 10,
        }}
      ></div>
      
      {/* Summary with Compact Audio Controls */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200 relative glow-effect hover-glow">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-green-800 mb-2">✅ Analysis Complete</h3>
          <p className="text-green-700 pr-16">{summary}</p>
        </div>
        
        {/* Compact Audio Controls - Top Right Corner */}
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          {/* Audio Status Indicator */}
          <div className="flex items-center space-x-1">
            <div className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-xs text-gray-600 font-medium">
              {isPlaying ? 'Playing' : 'Ready'}
            </span>
          </div>
          
          {/* Compact Audio Control */}
          {!isPlaying ? (
            <button
              onClick={handlePlayAudio}
              className="group relative bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 shadow-md hover-glow"
              title="Listen to analysis"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleStopAudio}
              className="group relative bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 shadow-md hover-glow"
              title="Stop audio"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
              </svg>
            </button>
          )}
          
          {/* Compact Audio Settings Toggle */}
          <button
            onClick={() => setShowAudioSettings(!showAudioSettings)}
            className={`group relative p-2 rounded-full transition-all duration-200 hover:shadow-md transform hover:scale-105 hover-glow ${
              showAudioSettings 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                : 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-600'
            }`}
            title="Audio settings"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Compact Audio Settings Panel */}
        {showAudioSettings && (
          <div className="absolute top-12 right-4 bg-white rounded-lg p-3 border border-gray-200 shadow-lg z-10 min-w-48 animated-border">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold text-gray-800">Audio Settings</h4>
              <div className="text-xs text-gray-500 bg-green-100 px-2 py-1 rounded-full">
                Live
              </div>
            </div>
            
            <div className="space-y-3">
              {/* Volume Control */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-gray-700">Volume</label>
                  <span className="text-xs font-mono text-gray-600">
                    {Math.round(audioSettings.volume * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={audioSettings.volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  title={`Volume: ${Math.round(audioSettings.volume * 100)}%`}
                />
              </div>
              
              {/* Speed Control */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-gray-700">Speed</label>
                  <span className="text-xs font-mono text-gray-600">
                    {audioSettings.rate}x
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={audioSettings.rate}
                  onChange={handleRateChange}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  title={`Speed: ${audioSettings.rate}x`}
                />
              </div>
              
              {/* Pitch Control */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-gray-700">Pitch</label>
                  <span className="text-xs font-mono text-gray-600">
                    {audioSettings.pitch.toFixed(1)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={audioSettings.pitch}
                  onChange={handlePitchChange}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  title={`Pitch: ${audioSettings.pitch.toFixed(1)}`}
                />
              </div>
            </div>
            
            {/* Quick Presets */}
            <div className="mt-3 pt-2 border-t border-gray-200">
              <div className="flex items-center space-x-1">
                <span className="text-xs font-medium text-gray-600">Presets:</span>
                <button
                  onClick={() => setAudioSettings({ volume: 1.0, rate: 0.8, pitch: 1.0 })}
                  className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded hover:bg-blue-200 transition-colors hover-glow"
                >
                  Slow
                </button>
                <button
                  onClick={() => setAudioSettings({ volume: 1.0, rate: 1.0, pitch: 1.0 })}
                  className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded hover:bg-green-200 transition-colors hover-glow"
                >
                  Normal
                </button>
                <button
                  onClick={() => setAudioSettings({ volume: 1.0, rate: 1.5, pitch: 1.0 })}
                  className="text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded hover:bg-orange-200 transition-colors hover-glow"
                >
                  Fast
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Professional Error Message */}
        {audioError && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center">
              <svg className="h-4 w-4 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="ml-2">
                <p className="text-xs text-red-700 font-medium">Audio Error</p>
                <p className="text-xs text-red-600">{audioError}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Document Information */}
      {renderDocumentInfo()}

      {/* Analysis Results */}
      {renderAnalysis()}

      {/* Extracted Text */}
      {renderExtractedText()}

      {/* Fallback for different data structures */}
      {!json.analysis && !json.extractedText && renderFallback()}

      {/* Raw JSON (Collapsible) */}
      <details className="bg-gray-50 rounded-lg">
        <summary className="cursor-pointer p-3 font-medium text-gray-700 hover:text-gray-900">
          🔧 View Raw Data (JSON)
        </summary>
        <div className="p-3 border-t">
          <pre className="bg-white rounded p-2 text-xs overflow-x-auto">
            {JSON.stringify(json, null, 2)}
          </pre>
          <button
            className="mt-2 text-blue-600 underline text-sm"
            onClick={() => navigator.clipboard.writeText(JSON.stringify(json, null, 2))}
          >
            Copy JSON
          </button>
        </div>
      </details>
    </div>
  );
};

export default ExtractedFields; 