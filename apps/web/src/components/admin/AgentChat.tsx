'use client';

import React, { useState, useRef, useEffect } from 'react';
import { chatWithAgent, ChatMessage } from '@/app/actions/ai-actions';
import { Send, Bot, X, Loader2, Maximize2, Minimize2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function AgentChat() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    setInput('');
    setIsLoading(true);

    const newHistory = [...messages, { role: 'user' as const, content: userMsg }];
    setMessages(newHistory);

    try {
      const adminUserId = session?.user?.id;
      if (!adminUserId) {
        throw new Error('You must be logged in to use the AI Agent.');
      }
      const result = await chatWithAgent(userMsg, messages, adminUserId);

      if (result.success && result.updatedHistory) {
        setMessages(result.updatedHistory);
        window.dispatchEvent(new Event('dataUpdated'));
      } else {
        setMessages([
          ...newHistory, 
          { role: 'model', content: `Error: ${result.error || 'Failed to communicate with AI'}` }
        ]);
      }
    } catch (error: any) {
      setMessages([
        ...newHistory,
        { role: 'model', content: `Error: ${error.message}` }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => setIsOpen(!isOpen);

  if (!isOpen) {
    return (
      <button 
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 z-50 flex items-center justify-center"
      >
        <Bot size={28} />
      </button>
    );
  }

  return (
    <div 
      className={`fixed bottom-6 right-6 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 z-50 ${
        isExpanded ? 'w-[600px] h-[80vh]' : 'w-[400px] h-[550px]'
      }`}
    >
      {/* Header */}
      <div className="bg-gray-800/80 backdrop-blur border-b border-gray-700/50 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-green-500/20 p-2 rounded-lg">
            <Bot size={20} className="text-green-400" />
          </div>
          <div>
            <h3 className="text-white font-medium text-sm">CarboniX Agent</h3>
            <p className="text-xs text-gray-400">Powered by Gemini AI</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button 
            onClick={toggleChat}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-60">
            <Bot size={48} className="text-gray-500" />
            <p className="text-sm text-gray-400 max-w-[250px]">
              Hi! I'm your CarboniX AI assistant. I can help you track deployments, switch regions, or send mobile notifications.
            </p>
          </div>
        )}
        
        {messages.map((msg, i) => {
          if (msg.role === 'function') {
             return (
               <div key={i} className="flex justify-center my-2">
                 <span className="text-xs bg-gray-800 border border-gray-700 text-gray-400 px-3 py-1 rounded-full flex items-center gap-2">
                   ⚙️ Action Completed
                 </span>
               </div>
             );
          }
          if (msg.role === 'model' && msg.name) {
             return (
               <div key={i} className="flex justify-center my-2">
                 <span className="text-xs bg-indigo-900/40 border border-indigo-700/50 text-indigo-300 px-3 py-1 rounded-full flex items-center gap-2 animate-pulse">
                   <Loader2 size={12} className="animate-spin" />
                   Executing {msg.name}...
                 </span>
               </div>
             );
          }
          
          const isUser = msg.role === 'user';
          
          return (
            <div key={i} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                  isUser 
                    ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-br-none' 
                    : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-bl-none'
                }`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 border border-gray-700 text-gray-400 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-2">
              <span className="flex space-x-1">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-gray-800/50 border-t border-gray-700/50">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative flex items-center"
        >
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Ask AI to switch regions, check status..."
            className="w-full bg-gray-900 border border-gray-700 text-sm text-white rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 placeholder-gray-500 transition-all"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-green-500"
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </form>
      </div>
    </div>
  );
}
