import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X, Bot } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { geminiService } from '../services/geminiService';
import { Ingredient } from '../types/ingredient';
import { UserPreferences } from '../types/preferences';
import { PreferencesService } from '../services/preferencesService';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface SarthiChatProps {
  ingredients?: Ingredient[];
  userPreferences?: string[];
  preferences?: UserPreferences;
}

export const SarthiChat: React.FC<SarthiChatProps> = ({
  ingredients = [],
  userPreferences = [],
  preferences
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Namaste! I\'m Sarthi, your AI assistant. Ask me anything about ingredients, health effects, or food safety in Hindi, English, or Hinglish! 🙏',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await geminiService.chatWithSarthi(inputMessage, {
        ingredients,
        userPreferences,
        preferences: preferences || PreferencesService.loadPreferences()
      });

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 rounded-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white shadow-lg hover:shadow-xl transition-all duration-200 z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] max-w-80 h-[70vh] max-h-96 bg-white rounded-lg shadow-xl border z-50 flex flex-col">
      {/* Header */}
      <div className="bg-[#2E7D32] text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <span className="font-medium">Ask Sarthi</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20 p-1 h-auto min-h-[44px]"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`
                max-w-[85%] p-3 rounded-lg text-sm
                ${message.isUser
                  ? 'bg-[#03A9F4] text-white'
                  : 'bg-gray-100 text-gray-900'
                }
              `}
            >
              {message.text}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-900 p-3 rounded-lg text-sm">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about ingredients..."
            disabled={isLoading}
            className="flex-1 text-sm"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            size="sm"
            className="bg-[#03A9F4] hover:bg-[#0288D1] min-h-[44px] px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};