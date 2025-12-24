import React, { useState, useRef, useEffect } from 'react';
import { Mic, User, Send, Loader2, Sparkles } from 'lucide-react';
import SimpleIcons from '../components/SimpleIcons';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      content: "Hello! I'm Dhan Sarthi, your personal financial advisor. I can help you with personal finance, investments, government schemes, tax planning, and more. What would you like to know today?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const backend_url = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Prepare conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch(`${backend_url}/api/financial-advice/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          conversationHistory: conversationHistory
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const botMessage = {
        id: Date.now() + 1,
        role: 'bot',
        content: data.response,
        timestamp: data.timestamp || new Date().toISOString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        role: 'bot',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  const startVoiceRecording = () => {
    setIsRecording(true);
    // For now, we'll simulate voice recording
    // In a real implementation, you'd integrate with Web Speech API
    setTimeout(() => {
      setIsRecording(false);
      // Simulate voice input
      const simulatedVoiceInput = "Tell me about government schemes for farmers";
      sendMessage(simulatedVoiceInput);
    }, 2000);
  };

  const VoiceRecordingAnimation = () => (
    <div className="flex items-center justify-center space-x-2">
      <div className="relative">
        <div className={`absolute inset-0 bg-green-400 rounded-full animate-ping ${isRecording ? 'opacity-75' : 'opacity-0'}`}></div>
        <div className={`relative w-2 h-2 bg-green-500 rounded-full ${isRecording ? 'animate-pulse' : ''}`}></div>
      </div>
      <div className="flex space-x-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-0.5 bg-green-500 rounded-full transform origin-bottom transition-all duration-300 ${
              isRecording ? `h-${Math.random() > 0.5 ? '3' : '4'} animate-bounce` : 'h-1'
            }`}
            style={{ animationDelay: `${i * 100}ms` }}
          ></div>
        ))}
      </div>
    </div>
  );

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex-1 min-h-full max-w-3xl mx-auto p-1">
      <div className="bg-white rounded-lg shadow-md min-h-full flex flex-col overflow-hidden border border-green-200 relative group">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50 opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-4 left-4 w-2 h-2 bg-green-300 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-8 right-6 w-1 h-1 bg-emerald-400 rounded-full animate-ping opacity-40"></div>
          <div className="absolute bottom-16 left-8 w-1.5 h-1.5 bg-green-200 rounded-full animate-bounce opacity-50"></div>
        </div>

        {/* Enhanced Chat Header */}
        <div className="p-2 border-b bg-gradient-to-r from-green-500 to-emerald-600 text-white relative z-10 hover:from-green-600 hover:to-emerald-700 transition-all duration-300">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-all duration-300 hover:scale-110">
              <SimpleIcons.Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-sm font-bold flex items-center">
                Dhan Sarthi
                <Sparkles className="w-3 h-3 ml-1 text-yellow-300 animate-pulse" />
              </h1>
              <p className="text-green-100 text-xs font-medium">Your Personal Financial Guide</p>
            </div>
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse"></div>
              <div className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2 scrollbar-hide bg-gradient-to-b from-gray-50 to-white relative z-10">
          <style>
            {`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
              .animate-fade-in {
                animation: fadeIn 0.5s ease-in-out;
              }
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .message-hover {
                transition: all 0.3s ease;
              }
              .message-hover:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(34, 197, 94, 0.15);
              }
              .typing-dots {
                display: inline-block;
              }
              .typing-dots::after {
                content: '';
                animation: typing 1.5s infinite;
              }
              @keyframes typing {
                0%, 20% { content: ''; }
                40% { content: '.'; }
                60% { content: '..'; }
                80%, 100% { content: '...'; }
              }
            `}
          </style>
          
          {messages.map((message) => (
            <div key={message.id} className={`flex items-start space-x-2 animate-fade-in message-hover ${
              message.role === 'user' ? 'justify-end' : ''
            }`}>
              {message.role === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110">
                  <SimpleIcons.Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className={`max-w-[85%] p-2 rounded-lg shadow-sm border transition-all duration-300 ${
                message.role === 'user' 
                  ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-tr-none hover:from-green-600 hover:to-emerald-700' 
                  : 'bg-white border-green-100 rounded-tl-none hover:border-green-200 hover:shadow-md'
              }`}>
                <p className={`text-xs font-medium ${
                  message.role === 'user' ? 'text-white' : 'text-gray-800'
                }`}>
                  {message.content}
                </p>
                <p className={`text-xs mt-1 ${
                  message.role === 'user' ? 'text-green-100' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
              
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}

          {/* Enhanced Loading indicator */}
          {isLoading && (
            <div className="flex items-start space-x-2 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-md animate-pulse">
                <SimpleIcons.Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white p-2 rounded-lg rounded-tl-none shadow-sm border border-green-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-3 h-3 text-green-600 animate-spin" />
                  <p className="text-xs text-gray-600">
                    Dhan Sarthi is typing<span className="typing-dots"></span>
                  </p>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced Input Area */}
        <div className="border-t border-green-200 p-2 bg-gradient-to-r from-green-50 to-emerald-50 relative z-10">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <button
              type="button"
              onClick={startVoiceRecording}
              disabled={isLoading || isRecording}
              className={`p-1.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md ${
                isRecording 
                  ? 'bg-red-100 text-red-500 animate-pulse shadow-lg scale-110' 
                  : 'bg-green-100 text-green-600 hover:bg-green-200 hover:scale-105 disabled:opacity-50'
              }`}
            >
              <Mic className="w-3 h-3" />
            </button>
            
            <div className="flex-1 relative group">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me about finance, investments, government schemes..."
                disabled={isLoading || isRecording}
                className="w-full p-1.5 pr-8 text-xs border border-green-300 rounded-md focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 disabled:opacity-50 transition-all duration-300 group-hover:border-green-400"
              />
              {isRecording && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <VoiceRecordingAnimation />
                </div>
              )}
              {/* Input focus effect */}
              <div className="absolute inset-0 rounded-md bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading || isRecording}
              className="p-1.5 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Send className="w-3 h-3" />
            </button>
          </form>
          
          {/* Enhanced Quick suggestions */}
          <div className="mt-2 flex flex-wrap gap-1">
            {[
              "Government schemes",
              "Investment advice",
              "How to save money?",
              "Tax saving tips"
            ].map((suggestion, index) => (
              <button
                key={suggestion}
                onClick={() => sendMessage(suggestion)}
                disabled={isLoading || isRecording}
                className="px-2 py-0.5 text-xs bg-white border border-green-300 rounded-full hover:bg-green-50 hover:border-green-400 hover:shadow-sm transition-all duration-300 disabled:opacity-50 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;