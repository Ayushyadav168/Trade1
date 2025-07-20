"use client";
import { useState, useRef } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { geminiService } from "../lib/gemini";

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! I'm your AI trading assistant. Ask me anything about stocks, investing, or finance!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    setAiTyping(true);
    try {
      // Use OpenAI GPT for live chat
      const aiText = await geminiService.chatWithAI(input);
      setMessages((msgs) => [...msgs, { sender: "ai", text: aiText }]);
    } catch (e) {
      setMessages((msgs) => [...msgs, { sender: "ai", text: "Sorry, I couldn't process that. Please try again." }]);
    }
    setLoading(false);
    setAiTyping(false);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all flex items-center gap-2"
        onClick={() => setOpen(true)}
        title="Ask AI Assistant"
        style={{ boxShadow: "0 4px 24px 0 rgba(80, 63, 205, 0.15)" }}
      >
        <Sparkles className="h-6 w-6 animate-pulse" />
        <span className="font-bold hidden sm:inline">AI Chat</span>
      </button>
      {/* Chat Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-md mx-auto flex flex-col overflow-hidden animate-fade-in-up">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
              <div className="flex items-center gap-2">
                <Sparkles className="h-7 w-7 text-yellow-300 animate-pulse" />
                <span className="text-lg font-bold text-white">AI Trading Assistant</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-white text-2xl hover:text-yellow-300">&times;</button>
            </div>
            {/* Chat Body */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[60vh] bg-gradient-to-br from-blue-50 to-purple-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === "ai" ? "justify-start" : "justify-end"}`}>
                  <div className={`rounded-xl px-4 py-3 shadow-md max-w-[80%] ${msg.sender === "ai" ? "bg-white text-gray-900" : "bg-blue-600 text-white"}`}>
                    {msg.sender === "ai" && (
                      <span className="inline-block mr-2 align-middle">
                        <Sparkles className="h-5 w-5 text-purple-500 animate-pulse inline" />
                      </span>
                    )}
                    <span className="align-middle whitespace-pre-line">{msg.text}</span>
                  </div>
                </div>
              ))}
              {aiTyping && (
                <div className="flex justify-start">
                  <div className="rounded-xl px-4 py-3 shadow-md bg-white text-gray-900 max-w-[80%] flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500 animate-pulse" />
                    <span className="animate-pulse">AI is typing...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            {/* Input */}
            <form
              className="flex items-center gap-2 p-4 border-t border-gray-200 bg-white"
              onSubmit={e => { e.preventDefault(); handleSend(); }}
            >
              <input
                type="text"
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ask about stocks, investing, or finance..."
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={loading}
                autoFocus
              />
              <button
                type="submit"
                className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-50"
                disabled={loading || !input.trim()}
                title="Send"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
} 