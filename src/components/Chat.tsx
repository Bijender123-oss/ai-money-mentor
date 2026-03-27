import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Mic, PlusCircle, TrendingUp, Landmark, Flame, BarChart3, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  type: "ai" | "user";
  text: string;
  time: string;
  insight?: {
    title: string;
    value: string;
    change: string;
    confidence: string;
    progress: number;
  };
}

export default function Chat() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      text: "Good morning, Alex. I've analyzed your portfolio overnight. Your allocation in Tech Growth is currently outperforming the benchmark by 4.2%. Would you like to see the breakdown or discuss your FIRE status?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      type: "user",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: "You are FinMentor AI, a world-class financial advisor and wealth management expert. Your tone is professional, encouraging, and data-driven. You help users with investment strategies, FIRE (Financial Independence, Retire Early) planning, tax optimization, and expense analysis. Keep responses concise but insightful. If the user asks for specific financial projections, provide realistic estimates based on general market trends.",
        },
        history: messages.map(m => ({
          role: m.type === "user" ? "user" : "model",
          parts: [{ text: m.text }]
        }))
      });

      const result = await chat.sendMessage({ message: input });
      const responseText = result.text;

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        text: "I'm having trouble connecting to my financial brain right now. Please try again in a moment.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const chips = [
    { icon: TrendingUp, label: "Analyze my expenses", color: "text-primary-fixed-dim" },
    { icon: Landmark, label: "Tax help", color: "text-secondary-fixed-dim" },
    { icon: Flame, label: "FIRE status", color: "text-tertiary-fixed-dim" },
    { icon: BarChart3, label: "Stock Insights", color: "text-primary-container" },
  ];

  return (
    <main className="relative min-h-screen pt-24 pb-44 px-4 md:px-8 max-w-4xl mx-auto flex flex-col">
      <div 
        ref={scrollRef}
        className="flex-grow space-y-8 custom-scrollbar overflow-y-auto max-h-[calc(100vh-320px)]"
      >
        <div className="flex justify-center">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant/40 bg-surface-container-low px-4 py-1 rounded-full">
            Today
          </span>
        </div>

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${msg.type === "ai" ? "items-start max-w-[90%]" : "items-end max-w-[85%] ml-auto"} group`}
            >
              {msg.type === "ai" && (
                <div className="flex items-center gap-2 mb-2 ml-1">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-secondary-container to-primary-container flex items-center justify-center">
                    <Sparkles size={14} className="text-white" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-secondary-fixed-dim">
                    FinMentor AI
                  </span>
                </div>
              )}
              
              <div className={`${
                msg.type === "ai" 
                  ? "bg-gradient-to-br from-[rgba(143,1,147,0.15)] to-[rgba(0,255,65,0.05)] border border-[rgba(143,1,147,0.2)] rounded-tl-none" 
                  : "bg-[rgba(53,53,52,0.6)] border border-[rgba(132,150,126,0.1)] rounded-tr-none"
              } backdrop-blur-xl p-4 rounded-2xl text-on-surface leading-relaxed shadow-lg space-y-4`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
                
                {msg.insight && (
                  <div className="bg-surface-container-lowest/50 rounded-xl p-4 border border-outline-variant/10">
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-bold mb-1">
                          {msg.insight.title}
                        </p>
                        <h3 className="font-headline text-3xl font-extrabold text-primary-container tracking-tighter">
                          {msg.insight.value} <span className="text-sm font-medium text-on-surface-variant">{msg.insight.change}</span>
                        </h3>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-bold mb-1">
                          Confidence
                        </p>
                        <span className="bg-primary-container/10 text-primary-container text-[10px] px-2 py-0.5 rounded font-bold">
                          {msg.insight.confidence}
                        </span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden flex">
                      <div 
                        className="h-full bg-primary-container shadow-[0_0_10px_rgba(0,255,65,0.4)]" 
                        style={{ width: `${msg.insight.progress}%` }}
                      />
                      <div 
                        className="h-full bg-secondary-container" 
                        style={{ width: `${100 - msg.insight.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className={`flex items-center gap-1 mt-2 ${msg.type === "ai" ? "ml-2" : "mr-2"}`}>
                <span className="text-[9px] opacity-30 font-medium uppercase tracking-tighter">
                  {msg.time}
                </span>
                {msg.type === "user" && (
                  <span className="text-primary-fixed-dim">✓✓</span>
                )}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 ml-1"
            >
              <div className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center">
                <Loader2 size={14} className="text-primary-container animate-spin" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/40">
                Thinking...
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Suggestion Chips */}
      <div className="fixed bottom-32 left-0 w-full px-4 md:px-8 z-40">
        <div className="max-w-4xl mx-auto flex gap-2 overflow-x-auto pb-4 no-scrollbar">
          {chips.map((chip, i) => (
            <button
              key={i}
              onClick={() => setInput(chip.label)}
              className="whitespace-nowrap bg-surface-container-high/60 backdrop-blur-md border border-outline-variant/20 px-4 py-2 rounded-full text-xs font-bold text-on-surface hover:bg-surface-container-highest transition-colors duration-300 flex items-center gap-2"
            >
              <chip.icon size={14} className={chip.color} />
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Section */}
      <div className="fixed bottom-24 left-0 w-full px-4 md:px-8 z-40">
        <div className="max-w-4xl mx-auto bg-surface-container/90 backdrop-blur-2xl rounded-3xl p-2 shadow-2xl flex items-center gap-2 border border-outline-variant/10">
          <button className="p-3 text-on-surface-variant/60 hover:text-on-surface transition-colors">
            <PlusCircle size={24} />
          </button>
          <input
            className="flex-grow bg-transparent border-none focus:ring-0 text-on-surface placeholder-on-surface-variant/40 text-sm font-medium py-3"
            placeholder="Ask about your wealth..."
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <div className="flex items-center gap-1">
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center shadow-[0_0_20px_rgba(0,255,65,0.3)] hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:scale-100"
            >
              {isLoading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
