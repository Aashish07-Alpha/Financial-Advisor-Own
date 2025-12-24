import React, { useState, useRef, useEffect, useCallback } from 'react';
import SimpleIcons from './SimpleIcons';
import { useNavigate, useLocation } from 'react-router-dom';

const VoiceNavigator = () => {
  // Voice state
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [conversationMode, setConversationMode] = useState(false);
  const [lastCommand, setLastCommand] = useState("");
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('connected'); // connected, offline, error
  const [retryCount, setRetryCount] = useState(0);
  const [processingTime, setProcessingTime] = useState(0);
  const [isWakeWordListening, setIsWakeWordListening] = useState(true); // Always listening for wake word
  const [wakeWordDetected, setWakeWordDetected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false); // Track if assistant is speaking

  // UI state
  const [isOpen, setIsOpen] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const recognitionRef = useRef(null);
  const wakeWordRecognitionRef = useRef(null);
  const synthesisRef = useRef(null);
  const processingTimeoutRef = useRef(null);
  const retryTimeoutRef = useRef(null);
  const wakeWordRecognitionActive = useRef(false);
  const commandRecognitionActive = useRef(false);
  const isInitialized = useRef(false);
  const backend_url = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

  // Wake word patterns
  const WAKE_WORDS = [
    /^hello\s+fin\s+advisor$/i,
    /^hello\s+financial\s+advisor$/i,
    /^hi\s+fin\s+advisor$/i,
    /^hi\s+financial\s+advisor$/i,
    /^hey\s+fin\s+advisor$/i,
    /^hey\s+financial\s+advisor$/i,
    /^fin\s+advisor$/i,
    /^financial\s+advisor$/i
  ];

  // Enhanced website structure for LLM understanding
  const websiteStructure = {
    pages: {
      home: { path: "/", description: "Main homepage with financial services overview" },
      news: { path: "/news", description: "Latest financial news and updates" },
      learn: { path: "/learn", description: "Educational content and learning resources" },
      ppf: { path: "/ppf", description: "PPF calculator and investment tools" },
      community: { path: "/community", description: "Community forum and discussions" },
      chatbot: { path: "/chatbot", description: "AI chatbot for financial advice" },
      expenses: { path: "/expenses", description: "Expense tracking and management" },
      scams: { path: "/scams", description: "Information about financial scams" },
      profile: { path: "/profile", description: "User profile and settings" },
      login: { path: "/login", description: "User login page" },
      signup: { path: "/signup", description: "User registration page" }
    },
    actions: {
      "send message": { action: "open_chat", description: "Open chat interface" },
      "schedule meeting": { action: "schedule_meeting", description: "Schedule a consultation" },
      "calculate": { action: "open_calculator", description: "Open financial calculator" },
      "track expenses": { action: "open_expenses", description: "Open expense tracker" },
      "get advice": { action: "get_advice", description: "Get financial advice" },
      "check balance": { action: "check_balance", description: "Check account balance" },
      "invest money": { action: "investment_guide", description: "Investment guidance" },
      "save money": { action: "saving_tips", description: "Money saving tips" }
    }
  };

  // Enhanced voice commands with fallback
  const fallbackCommands = {
    "hello financial advisor": { type: 'greeting', response: "Hello! Welcome to Financial Advisor. How can I help you?" },
    "go to calculator": { type: 'navigate', path: '/ppf', response: "Taking you to the calculator." },
    "go to expenses": { type: 'navigate', path: '/expenses', response: "Opening expense tracker." },
    "go to community": { type: 'navigate', path: '/community', response: "Taking you to the community." },
    "go to news": { type: 'navigate', path: '/news', response: "Opening news page." },
    "go to learn": { type: 'navigate', path: '/learn', response: "Taking you to learning resources." },
    "schedule meeting": { type: 'action', action: 'schedule_meeting', response: "I'll help you schedule a meeting." },
    "help": { type: 'help', response: "I can help you navigate, get advice, track expenses, and more. What would you like to do?" }
  };

  // Voice functions with enhanced error handling
  const speakResponse = useCallback((text) => {
    if (isMuted || !synthesisRef.current) return;
    
    try {
      // Stop any ongoing speech
      synthesisRef.current.cancel();
      
      setIsSpeaking(true);
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setError('Speech synthesis failed');
        setIsSpeaking(false);
      };
      
      utterance.onend = () => {
        console.log('Speech synthesis completed');
        setIsSpeaking(false);
      };
      
      synthesisRef.current.speak(utterance);
    } catch (error) {
      console.error('Speech synthesis error:', error);
      setError('Speech synthesis failed');
      setIsSpeaking(false);
    }
  }, [isMuted]);

  // Wake word detection function
  const detectWakeWord = useCallback((text) => {
    const lowerText = text.toLowerCase().trim();
    
    // Only check for exact matches to avoid false positives
    return WAKE_WORDS.some(pattern => pattern.test(lowerText));
  }, []);

  // Handle wake word detection
  const handleWakeWordDetected = useCallback(() => {
    console.log('Wake word detected! Starting voice assistant...');
    setWakeWordDetected(true);
    setIsActive(true);
    setError(null);
    setConversationMode(true);
    
    // Stop wake word listening immediately to prevent self-triggering
    if (wakeWordRecognitionRef.current && wakeWordRecognitionActive.current) {
      try {
        wakeWordRecognitionRef.current.stop();
      } catch (error) {
        console.log('Error stopping wake word recognition:', error.message);
      }
    }
    
    // Stop wake word listening temporarily
    setIsWakeWordListening(false);
    
    // Speak welcome message after a delay to avoid self-triggering
    setTimeout(() => {
      speakResponse("Hello! I'm your Financial Advisor voice assistant. How can I help you today?");
      
      // Start command listening after speech
      setTimeout(() => {
        if (recognitionRef.current && !commandRecognitionActive.current) {
          try {
            recognitionRef.current.start();
          } catch (error) {
            console.log('Error starting command recognition:', error.message);
          }
        }
      }, 2000); // Wait for speech to complete
    }, 500);
    
    // Resume wake word listening after 30 seconds of inactivity
    setTimeout(() => {
      if (!isListening) {
        setIsWakeWordListening(true);
        setWakeWordDetected(false);
        setIsActive(false);
        setConversationMode(false);
      }
    }, 30000);
  }, [speakResponse, isListening]);

  const processVoiceCommand = useCallback(async (command) => {
    if (!command.trim()) return;
    
    setIsProcessing(true);
    setError(null);
    setLastCommand(command);
    const startTime = Date.now();
    
    try {
      // Check connection status first
      if (connectionStatus === 'offline') {
        throw new Error('Offline mode - using fallback processing');
      }

      // Enhanced API call with timeout and retry
      const response = await fetchWithTimeout(`${backend_url}/api/voice-navigation/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          command: command.toLowerCase(),
          currentPage: location.pathname,
          websiteStructure: websiteStructure,
          conversationMode: conversationMode,
          userId: 'user-' + Date.now() // Simple user ID for logging
        }),
      }, 10000); // 10 second timeout

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setProcessingTime(Date.now() - startTime);
      
      // Execute the action
      await executeAction(data.action, data.response);
      
      // Speak the response
      speakResponse(data.response);
      
      // Update conversation mode if needed
      if (data.conversationMode !== undefined) {
        setConversationMode(data.conversationMode);
      }

      // Show suggestions if provided
      if (data.suggestions && data.suggestions.length > 0) {
        setShowSuggestions(true);
        setTimeout(() => setShowSuggestions(false), 5000);
      }

      setConnectionStatus('connected');
      setRetryCount(0);

    } catch (error) {
      console.error('Error processing voice command:', error);
      setProcessingTime(Date.now() - startTime);
      
      // Fallback to local processing
      await processFallbackCommand(command);
      
      // Update connection status
      if (error.message.includes('timeout') || error.message.includes('network')) {
        setConnectionStatus('offline');
      } else {
        setConnectionStatus('error');
      }
    } finally {
      setIsProcessing(false);
    }
  }, [conversationMode, location.pathname, speakResponse, connectionStatus]);

  // Enhanced fetch with timeout
  const fetchWithTimeout = async (url, options, timeout) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  };

  // Fallback command processing
  const processFallbackCommand = async (command) => {
    const lowerCommand = command.toLowerCase();
    
    // Check fallback commands
    for (const [pattern, action] of Object.entries(fallbackCommands)) {
      if (lowerCommand.includes(pattern) || pattern.includes(lowerCommand)) {
        await executeAction(action, action.response);
        speakResponse(action.response);
        return;
      }
    }
    
    // Generic fallback response
    const fallbackResponse = "I'm having trouble understanding that. You can try saying 'help' to see what I can do.";
    speakResponse(fallbackResponse);
    setError('Command not recognized');
  };

  const executeAction = useCallback(async (action, response) => {
    try {
      switch (action.type) {
        case 'navigate':
          if (action.path) {
            navigate(action.path);
          }
          break;
        case 'open_chat':
          speakResponse("Opening chat interface for you.");
          break;
        case 'schedule_meeting':
          navigate('/meetings');
          break;
        case 'open_calculator':
          navigate('/ppf');
          break;
        case 'open_expenses':
          navigate('/expenses');
          break;
        case 'get_advice':
          navigate('/chatbot');
          break;
        case 'investment_guide':
          navigate('/learn');
          break;
        case 'saving_tips':
          navigate('/learn');
          break;
        case 'greeting':
          // Handle greeting
          break;
        case 'help':
          // Show help
          break;
        case 'clarification':
          // Handle clarification request
          break;
        default:
          console.log('Unknown action:', action);
      }
    } catch (error) {
      console.error('Error executing action:', error);
      setError('Failed to execute action');
    }
  }, [navigate, speakResponse]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      // Clear any existing timeouts
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      
      recognitionRef.current?.start();
    }
  }, [isListening]);

  const toggleMute = () => setIsMuted(!isMuted);

  // Enhanced speech recognition setup
  useEffect(() => {
    if (isInitialized.current) return; // Prevent multiple initializations
    
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      // Setup wake word recognition (continuous listening)
      wakeWordRecognitionRef.current = new SpeechRecognition();
      wakeWordRecognitionRef.current.continuous = true;
      wakeWordRecognitionRef.current.interimResults = true;
      wakeWordRecognitionRef.current.lang = 'en-US';
      
      wakeWordRecognitionRef.current.onstart = () => {
        console.log('Wake word detection started');
        wakeWordRecognitionActive.current = true;
      };
      
      wakeWordRecognitionRef.current.onend = () => {
        console.log('Wake word detection ended');
        wakeWordRecognitionActive.current = false;
        // Restart wake word detection if it's supposed to be listening
        if (isWakeWordListening && !isActive) {
          setTimeout(() => {
            if (isWakeWordListening && !isActive && wakeWordRecognitionRef.current && !wakeWordRecognitionActive.current) {
              try {
                wakeWordRecognitionRef.current.start();
              } catch (error) {
                console.log('Failed to restart wake word recognition:', error.message);
              }
            }
          }, 100);
        }
      };
      
      wakeWordRecognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        // Check for wake word in both final and interim results
        const textToCheck = finalTranscript || interimTranscript;
        if (textToCheck && detectWakeWord(textToCheck) && !isSpeaking) {
          console.log('Wake word detected:', textToCheck);
          try {
            wakeWordRecognitionRef.current?.stop();
          } catch (error) {
            console.log('Error stopping wake word recognition:', error.message);
          }
          handleWakeWordDetected();
        }
      };
      
      wakeWordRecognitionRef.current.onerror = (event) => {
        console.error('Wake word recognition error:', event.error);
        wakeWordRecognitionActive.current = false;
        // Restart wake word detection on error
        setTimeout(() => {
          if (isWakeWordListening && !isActive && wakeWordRecognitionRef.current && !wakeWordRecognitionActive.current) {
            try {
              wakeWordRecognitionRef.current.start();
            } catch (error) {
              console.log('Failed to restart wake word recognition after error:', error.message);
            }
          }
        }, 1000);
      };

      // Setup command recognition
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onstart = () => {
        console.log('Command recognition started');
        setIsListening(true);
        setShowStatus(true);
        setError(null);
        commandRecognitionActive.current = true;
      };
      
      recognitionRef.current.onend = () => {
        console.log('Command recognition ended');
        setIsListening(false);
        setShowStatus(false);
        commandRecognitionActive.current = false;
        
        // If we're still in conversation mode, restart listening
        if (conversationMode && isActive) {
          setTimeout(() => {
            if (conversationMode && isActive && recognitionRef.current && !commandRecognitionActive.current) {
              try {
                recognitionRef.current.start();
              } catch (error) {
                console.log('Failed to restart command recognition:', error.message);
              }
            }
          }, 100);
        } else {
          // Resume wake word listening
          setIsWakeWordListening(true);
          setWakeWordDetected(false);
          setIsActive(false);
          setConversationMode(false);
        }
      };
      
      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        if (finalTranscript) {
          setTranscript(finalTranscript);
          processVoiceCommand(finalTranscript);
        } else if (interimTranscript) {
          setTranscript(interimTranscript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setShowStatus(false);
        
        switch (event.error) {
          case 'not-allowed':
            setError('Microphone access denied. Please allow microphone access.');
            break;
          case 'no-speech':
            setError('No speech detected. Please try speaking again.');
            break;
          case 'audio-capture':
            setError('Audio capture failed. Please check your microphone.');
            break;
          default:
            setError(`Speech recognition error: ${event.error}`);
        }
      };

      recognitionRef.current.onnomatch = () => {
        setError('No speech recognized. Please try again.');
      };

      isInitialized.current = true;

    } else {
      setError('Speech recognition not supported in this browser.');
    }

    if ('speechSynthesis' in window) {
      synthesisRef.current = window.speechSynthesis;
    } else {
      setError('Speech synthesis not supported in this browser.');
    }
  }, []); // Empty dependency array to run only once

  // Start wake word detection when conditions change
  useEffect(() => {
    // Add a small delay to ensure proper initialization
    const timer = setTimeout(() => {
      if (isInitialized.current && wakeWordRecognitionRef.current && isWakeWordListening && !isActive && !wakeWordRecognitionActive.current) {
         try {
           wakeWordRecognitionRef.current.start();
         } catch (error) {
          console.log('Wake word recognition already started or error:', error.message);
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isWakeWordListening, isActive]);

  // Connection status monitoring
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch(`${backend_url}/api/voice-navigation/test`, { 
          method: 'GET',
          signal: AbortSignal.timeout(5000)
        });
        if (response.ok) {
          setConnectionStatus('connected');
    } else {
          setConnectionStatus('error');
        }
      } catch (error) {
        setConnectionStatus('offline');
      }
    };

    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    checkConnection(); // Initial check

    return () => clearInterval(interval);
  }, [backend_url]);

  // Cleanup timeouts and recognition on unmount
  useEffect(() => {
    return () => {
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      
      // Stop all recognition instances
      if (wakeWordRecognitionRef.current && wakeWordRecognitionActive.current) {
        try {
        wakeWordRecognitionRef.current.stop();
        } catch (error) {
          console.log('Error stopping wake word recognition on cleanup:', error.message);
        }
      }
      
      if (recognitionRef.current && commandRecognitionActive.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          console.log('Error stopping command recognition on cleanup:', error.message);
        }
      }
    };
  }, []);

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <SimpleIcons.CheckCircle className="w-3 h-3 text-green-500" />;
      case 'offline':
        return <SimpleIcons.AlertCircle className="w-3 h-3 text-yellow-500" />;
      case 'error':
        return <SimpleIcons.AlertCircle className="w-3 h-3 text-red-500" />;
      default:
        return <SimpleIcons.AlertCircle className="w-3 h-3 text-gray-500" />;
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected';
      case 'offline':
        return 'Offline';
      case 'error':
        return 'Error';
      default:
        return 'Unknown';
    }
  };

  return (
      <div className="fixed bottom-6 left-6 z-50">
      {/* Main Voice Assistant Button */}
        <button
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isActive 
            ? 'bg-gradient-to-br from-green-500 to-emerald-600 animate-pulse' 
            : wakeWordDetected
            ? 'bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse'
            : 'bg-gradient-to-br from-gray-500 to-gray-600 hover:scale-110'
        } ${isListening ? 'animate-pulse scale-110' : ''} ${error ? 'ring-2 ring-red-500' : ''}`}
        onClick={() => {
          if (!isActive) {
            handleWakeWordDetected();
          } else {
            setIsActive(false);
            setConversationMode(false);
            setIsWakeWordListening(true);
            
            // Stop command recognition
            if (recognitionRef.current && commandRecognitionActive.current) {
              try {
                recognitionRef.current.stop();
              } catch (error) {
                console.log('Error stopping command recognition:', error.message);
              }
            }
          }
        }}
        title={isActive ? "Click to stop voice assistant" : "Say 'Hello Fin Advisor' to start"}
      >
        <SimpleIcons.Mic className="w-6 h-6" />
        {isWakeWordListening && !isActive && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        )}
              </button>

      {/* Status Indicator */}
      {showStatus && (
        <div className="absolute bottom-16 left-0 bg-white rounded-lg p-3 shadow-lg border border-gray-200 min-w-[250px] animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900 text-sm flex items-center">
              Voice Assistant
              <span className="ml-1 text-green-500 animate-pulse">🎤</span>
            </h3>
              <button
              onClick={() => setShowStatus(false)}
              className="text-gray-400 hover:text-gray-600"
              >
              <SimpleIcons.X className="w-4 h-4" />
              </button>
          </div>

          <div className="space-y-2">
            {/* Connection Status */}
             <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Connection:</span>
              <div className="flex items-center space-x-2">
                {getConnectionStatusIcon()}
                <span className="text-xs text-gray-700">{getConnectionStatusText()}</span>
              </div>
               </div>

            {/* Listening Status */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Status:</span>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-green-500 animate-pulse' : isWakeWordListening ? 'bg-blue-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-xs text-gray-700">
                  {isListening ? 'Listening...' : isWakeWordListening ? 'Wake Word Active' : 'Ready'}
                 </span>
               </div>
             </div>
             
            {/* Mode */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Mode:</span>
              <span className="text-xs text-gray-700">
                {conversationMode ? 'Conversation' : 'Wake Word'}
              </span>
            </div>

            {/* Processing Time */}
            {processingTime > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Response Time:</span>
                <span className="text-xs text-gray-700">{processingTime}ms</span>
                </div>
              )}
             
            {/* Error Display */}
            {error && (
              <div className="mt-2 p-2 bg-red-50 rounded border border-red-200">
                <p className="text-xs text-red-600 flex items-center">
                  <SimpleIcons.AlertCircle className="w-3 h-3 mr-1" />
                  {error}
                </p>
               </div>
             )}
             
            {/* Transcript */}
            {transcript && (
              <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200">
                <p className="text-xs text-gray-600 flex items-center">
                  <span className="mr-1 text-blue-500">💬</span>
                  "{transcript}"
                </p>
               </div>
             )}

            {/* Processing Indicator */}
            {isProcessing && (
              <div className="flex items-center space-x-2">
                <SimpleIcons.Loader2 className="w-3 h-3 text-green-500 animate-spin" />
                <span className="text-xs text-gray-600">Processing...</span>
              </div>
            )}
            </div>

          <div className="flex space-x-2 mt-3">
               <button
              onClick={toggleListening}
              disabled={isProcessing}
              className={`flex-1 py-1.5 px-2 rounded text-xs font-medium transition-all duration-300 ${
                   isListening 
                     ? 'bg-red-500 hover:bg-red-600 text-white' 
                     : 'bg-green-500 hover:bg-green-600 text-white'
              } disabled:opacity-50`}
               >
              {isListening ? 'Stop' : 'Start'}
               </button>

                               <button
              onClick={toggleMute}
              className={`p-1.5 rounded border transition-all duration-300 ${
                isMuted 
                  ? 'bg-red-100 border-red-300 text-red-600' 
                  : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <SimpleIcons.Volume2 className="w-3 h-3" />
                </button>
          </div>
        </div>
      )}

      {/* Suggestions Panel */}
      {showSuggestions && (
        <div className="absolute bottom-16 left-0 bg-white rounded-lg p-3 shadow-lg border border-gray-200 min-w-[250px] animate-fade-in">
          <h4 className="font-semibold text-gray-900 text-sm mb-2">Try saying:</h4>
          <div className="space-y-1">
            {["Go to calculator", "Track expenses", "Get advice", "Schedule meeting"].map((suggestion, index) => (
               <button
                key={index}
                onClick={() => processVoiceCommand(suggestion)}
                className="w-full text-left text-xs text-blue-600 hover:bg-blue-50 p-1 rounded transition-colors"
              >
                "{suggestion}"
               </button>
            ))}
          </div>
        </div>
      )}

      {/* Help Button */}
                 <button
        className="absolute bottom-0 left-16 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-all duration-300 hover:scale-110"
        onClick={() => setIsOpen(!isOpen)}
                 >
        <SimpleIcons.HelpCircle className="w-4 h-4" />
                 </button>

      {/* Help Panel */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 bg-white rounded-lg p-4 shadow-lg border border-gray-200 w-80 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Voice Commands</h3>
               <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
               >
              <SimpleIcons.X className="w-4 h-4" />
               </button>
             </div>

          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-800 text-sm mb-2">Wake Word:</h4>
              <div className="text-xs text-gray-600 mb-2">
                Say any of these to start the voice assistant:
              </div>
              <div className="space-y-1">
                {["Hello Fin Advisor", "Hello Financial Advisor", "Hi Fin Advisor", "Hey Fin Advisor"].map((wakeWord, index) => (
                  <span key={index} className="block text-xs bg-green-50 px-2 py-1 rounded border text-green-700">
                    "{wakeWord}"
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 text-sm mb-2">Navigation:</h4>
              <div className="grid grid-cols-2 gap-1">
                {Object.keys(websiteStructure.pages).map((page) => (
                  <span key={page} className="text-xs bg-gray-100 px-2 py-1 rounded border text-gray-700">
                    "Go to {page}"
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 text-sm mb-2">Actions:</h4>
              <div className="space-y-1">
                {Object.keys(websiteStructure.actions).map((action) => (
                  <span key={action} className="block text-xs bg-blue-50 px-2 py-1 rounded border text-blue-700">
                    "{action}"
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 text-sm mb-2">Examples:</h4>
              <div className="space-y-1 text-xs text-gray-600">
                <p>• "Hello Fin Advisor" (to start)</p>
                <p>• "Take me to the calculator"</p>
                <p>• "I want to track my expenses"</p>
                <p>• "Help me save money"</p>
                <p>• "Schedule a meeting"</p>
              </div>
            </div>

            {/* Connection Status in Help */}
            <div className="border-t pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">System Status:</span>
                <div className="flex items-center space-x-1">
                  {getConnectionStatusIcon()}
                  <span className={connectionStatus === 'connected' ? 'text-green-600' : 'text-red-600'}>
                    {getConnectionStatusText()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default VoiceNavigator;
