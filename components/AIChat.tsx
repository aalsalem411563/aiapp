import React, { useState, useEffect, useRef } from 'react';
import type { Chat } from '@google/genai';
import { startChatSession } from '../services/geminiService';
import type { ChatMessage, Page } from '../types';
import { PAGES } from '../constants';

const AIChat: React.FC<{ setCurrentPage: (page: Page) => void }> = ({ setCurrentPage }) => {
  const chatRef = useRef<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current = startChatSession();
    setMessages([{
        role: 'model',
        parts: [{ text: 'أهلاً بك! أنا Deep Seek، مساعدك التعليمي. كيف يمكنني مساعدتك اليوم؟' }]
    }]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading || !chatRef.current) return;

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: userInput }] };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userInput });
      const modelMessage: ChatMessage = { role: 'model', parts: [{ text: response.text }] };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: ChatMessage = { role: 'model', parts: [{ text: 'عذراً، حدث خطأ ما. يرجى المحاولة مرة أخرى.' }] };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-3xl h-[75vh] flex flex-col bg-slate-800 rounded-2xl shadow-2xl shadow-purple-900/10 border border-slate-700">
        <div className="p-4 border-b border-slate-700">
            <h2 className="text-xl font-bold text-center text-slate-100">مساعد AI التعليمي (Deep Seek)</h2>
        </div>
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'model' && (
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">DS</div>
              )}
              <div className={`max-w-md p-3 rounded-2xl ${msg.role === 'user' ? 'bg-pink-600 text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
                <p className="text-sm whitespace-pre-wrap">{msg.parts[0].text}</p>
              </div>
               {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">U</div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
               <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">DS</div>
                <div className="max-w-md p-3 rounded-2xl bg-slate-700 text-slate-400 rounded-bl-none">
                    <div className="flex items-center gap-2">
                        <span className="animate-pulse">.</span>
                        <span className="animate-pulse delay-150">.</span>
                        <span className="animate-pulse delay-300">.</span>
                        <span className="pr-2">Deep Seek يكتب</span>
                    </div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t border-slate-700">
          <form onSubmit={handleSendMessage} className="flex items-center gap-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="اسأل عن أي شيء تعليمي..."
              className="flex-1 bg-slate-700 border border-slate-600 rounded-full py-2 px-4 text-white focus:ring-purple-500 focus:border-purple-500 transition duration-300"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed transition duration-300"
              disabled={isLoading || !userInput.trim()}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            </button>
          </form>
        </div>
      </div>
      <button onClick={() => setCurrentPage(PAGES.HOME)} className="mt-8 bg-slate-700 text-slate-300 font-bold py-2 px-6 rounded-md hover:bg-slate-600 transition duration-300">
        العودة إلى الرئيسية
      </button>
    </div>
  );
};

export default AIChat;
