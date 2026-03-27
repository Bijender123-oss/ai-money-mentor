import React, { useState, useRef } from "react";
import { toast } from "sonner";
import { UploadCloud, AlertTriangle, Zap, BrainCircuit, ChevronRight, PieChart, TrendingUp, Landmark, RefreshCw, ArrowRightLeft, Info, Sparkles, Loader2, Target, Lightbulb, CheckCircle2, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GoogleGenAI, Type } from "@google/genai";

export default function Portfolio() {
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);
  const [showAddHolding, setShowAddHolding] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [simulationSuccess, setSimulationSuccess] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newHolding, setNewHolding] = useState({ symbol: "", name: "", amount: "" });
  const [targets, setTargets] = useState({
    equity: 60,
    debt: 30,
    crypto: 10
  });

  const totalValue = 6950000; // ₹ 69.5L
  const currentAlloc = {
    equity: 62,
    debt: 26,
    crypto: 12
  };

  const [holdings, setHoldings] = useState([
    { symbol: "AAPL", name: "Apple Inc.", sector: "Technology", weight: "12.4%", value: "₹ 8,42,000", change: "+2.14%", positive: true },
    { symbol: "RELI", name: "Reliance Industries", sector: "Energy & Retail", weight: "8.1%", value: "₹ 5,12,000", change: "-0.45%", positive: false },
  ]);

  const marketNews = [
    {
      title: "Apple (AAPL) Q2 Earnings: What to Expect",
      source: "Financial Times",
      time: "2h ago",
      image: "https://picsum.photos/seed/apple/400/200",
      category: "Earnings",
    },
    {
      title: "Reliance Industries Expands Green Energy Portfolio",
      source: "Economic Times",
      time: "4h ago",
      image: "https://picsum.photos/seed/energy/400/200",
      category: "Expansion",
    },
  ];

  const calculateRebalance = () => {
    const results = [
      { label: "Equity", current: (currentAlloc.equity / 100) * totalValue, target: (targets.equity / 100) * totalValue },
      { label: "Debt", current: (currentAlloc.debt / 100) * totalValue, target: (targets.debt / 100) * totalValue },
      { label: "Crypto/Gold", current: (currentAlloc.crypto / 100) * totalValue, target: (targets.crypto / 100) * totalValue },
    ];
    return results.map(r => ({
      ...r,
      diff: r.target - r.current,
      action: r.target > r.current ? "BUY" : "SELL"
    }));
  };

  const rebalanceData = calculateRebalance();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload/scan
      setTimeout(() => {
        setIsUploading(false);
        toast.success(`Successfully scanned: ${file.name}. AI Insights updated.`);
      }, 2000);
    }
  };

  const handleExecuteSimulation = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setSimulationSuccess(true);
      setTimeout(() => setSimulationSuccess(false), 3000);
    }, 1500);
  };

  const handleAddHolding = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = {
      symbol: newHolding.symbol,
      name: newHolding.name,
      sector: "Manual Entry",
      weight: "New",
      value: `₹ ${newHolding.amount}`,
      change: "0.00%",
      positive: true
    };
    setHoldings(prev => [newEntry, ...prev]);
    setShowAddHolding(false);
    toast.success(`${newHolding.symbol} added to portfolio`);
    setNewHolding({ symbol: "", name: "", amount: "" });
  };

  const generateAIRecommendations = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const holdingsStr = holdings.map(h => `${h.name} (${h.symbol}): ${h.weight} weight, ${h.value}`).join(", ");
      const newsStr = marketNews.map(n => n.title).join("; ");
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze this portfolio and current market news to provide 3 personalized investment recommendations:
        Total Value: ₹ ${totalValue.toLocaleString()}
        Allocation: Equity ${currentAlloc.equity}%, Debt ${currentAlloc.debt}%, Crypto ${currentAlloc.crypto}%
        Holdings: ${holdingsStr}
        Recent Market News: ${newsStr}
        User Profile: Aggressive growth with FIRE goals.
        
        Provide actionable advice with confidence scores and clear reasoning.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                action: { type: Type.STRING },
                confidence: { type: Type.NUMBER },
                reasoning: { type: Type.STRING },
                impact: { type: Type.STRING }
              },
              required: ["title", "action", "confidence", "reasoning", "impact"]
            }
          }
        }
      });

      const data = JSON.parse(response.text);
      setRecommendations(data);
    } catch (error) {
      console.error("AI Generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const alerts = [
    {
      icon: AlertTriangle,
      color: "text-error",
      borderColor: "border-l-error",
      title: "Over-exposure to Tech",
      desc: "Your current allocation in US Tech stocks exceeds your risk profile by 18%.",
      type: "Risk",
    },
    {
      icon: Zap,
      color: "text-secondary",
      borderColor: "border-l-secondary",
      title: "Rebalance Recommended",
      desc: "Shift 4% from Mid-cap to Liquid Funds to maintain quarterly liquidity buffer.",
      type: "Strategy",
    },
    {
      icon: TrendingUp,
      color: "text-primary-container",
      borderColor: "border-l-primary-container",
      title: "Significant Movement: AAPL",
      desc: "Apple Inc. (AAPL) is up 5.2% in pre-market trading following strong iPhone sales data.",
      type: "Market",
    },
    {
      icon: Landmark,
      color: "text-tertiary-fixed-dim",
      borderColor: "border-l-tertiary-fixed-dim",
      title: "News: Reliance Industries",
      desc: "Reliance announces new green energy partnership with global tech giant.",
      type: "News",
    },
  ];

  return (
    <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto space-y-10">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary-fixed/60">Insight Engine</span>
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary leading-tight">Portfolio X-Ray</h2>
            <p className="text-on-surface-variant max-w-md">Deep scan your multi-asset holdings for hidden risks and AI-driven alpha opportunities.</p>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-container/20 to-secondary-container/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative glass-card border border-outline-variant/10 rounded-3xl p-10 flex flex-col items-center justify-center text-center space-y-4 cursor-pointer hover:bg-surface-container-highest/40 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-primary-container/10 flex items-center justify-center shadow-[0_0_30px_rgba(0,255,65,0.15)]">
                <UploadCloud className="text-primary-container" size={40} />
              </div>
              <div className="space-y-1">
                <h3 className="font-headline font-bold text-lg text-on-surface">Import Statements</h3>
                <p className="text-sm text-on-surface-variant">Drop PDF, CSV or Excel files here to begin the X-Ray scan</p>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept=".pdf,.csv,.xlsx,.xls"
                onChange={handleFileUpload}
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="mt-4 px-8 py-3 bg-primary-container text-on-primary font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_10px_20px_rgba(0,255,65,0.2)] disabled:opacity-50"
              >
                {isUploading ? "Scanning..." : "Browse Files"}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-headline font-bold text-on-surface">Portfolio Alerts</h3>
            <span className="px-3 py-1 bg-error-container/20 text-error text-[10px] font-bold uppercase tracking-wider rounded-full">{alerts.length} Notifications</span>
          </div>
          
          {alerts.map((alert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card border-l-4 ${alert.borderColor} border border-outline-variant/5 rounded-2xl p-5 flex items-start gap-4 hover:translate-x-2 transition-transform duration-300`}
            >
              <div className={`${alert.color} mt-1`}>
                <alert.icon size={20} />
              </div>
              <div className="space-y-1 flex-grow">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-sm text-on-surface">{alert.title}</p>
                  <span className="text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant">
                    {alert.type}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant">{alert.desc}</p>
              </div>
            </motion.div>
          ))}

          <div className="mt-auto p-6 bg-gradient-to-br from-surface-container-highest to-surface-container rounded-3xl border border-outline-variant/10 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <BrainCircuit className="text-tertiary-fixed-dim" size={20} />
              <span className="text-xs font-bold text-tertiary-fixed-dim uppercase tracking-widest">Mentor AI Insight</span>
            </div>
            <p className="text-sm italic text-on-surface/80 leading-relaxed">
              "Your XIRR of 18.4% is in the top 5% of your peer group. Consider hedging your volatile small-cap gains with gold sovereign bonds."
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-container-low rounded-[2rem] p-8 border border-outline-variant/10 flex flex-col">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h3 className="font-headline font-bold text-xl text-primary">XIRR Performance</h3>
              <p className="text-sm text-on-surface-variant">Growth trajectory vs AI benchmark</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-headline font-extrabold text-primary-fixed-dim">+18.42%</span>
              <p className="text-[10px] uppercase font-bold text-primary-fixed/40">Past 12 Months</p>
            </div>
          </div>
          <div className="relative h-64 w-full mt-auto">
            <svg className="w-full h-full drop-shadow-[0_0_15px_rgba(0,255,65,0.2)]" viewBox="0 0 1000 300">
              <line stroke="#3b4b37" strokeDasharray="4" strokeOpacity="0.2" x1="0" x2="1000" y1="50" y2="50"></line>
              <line stroke="#3b4b37" strokeDasharray="4" strokeOpacity="0.2" x1="0" x2="1000" y1="150" y2="150"></line>
              <line stroke="#3b4b37" strokeDasharray="4" strokeOpacity="0.2" x1="0" x2="1000" y1="250" y2="250"></line>
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2 }}
                d="M0 280 L 100 240 L 250 260 L 400 180 L 600 210 L 750 120 L 900 140 L 1000 40" 
                fill="none" 
                stroke="#00ff41" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="4" 
              />
            </svg>
            <div className="absolute bottom-0 w-full flex justify-between text-[10px] font-bold text-on-surface-variant/40 px-2">
              <span>OCT</span><span>DEC</span><span>FEB</span><span>APR</span><span>JUN</span><span>AUG</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-[2rem] p-8 border border-outline-variant/10 flex flex-col items-center">
          <div className="w-full mb-8">
            <h3 className="font-headline font-bold text-xl text-primary">Asset Allocation</h3>
            <p className="text-sm text-on-surface-variant">Diversification Snapshot</p>
          </div>
          <div className="relative w-48 h-48 mb-8">
            <svg className="transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" fill="transparent" r="40" stroke="#00ff41" strokeDasharray="150 251" strokeWidth="12"></circle>
              <circle cx="50" cy="50" fill="transparent" r="40" stroke="#ffaaf7" strokeDasharray="60 251" strokeDashoffset="-150" strokeWidth="12"></circle>
              <circle cx="50" cy="50" fill="transparent" r="40" stroke="#00daf3" strokeDasharray="41 251" strokeDashoffset="-210" strokeWidth="12"></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-on-surface-variant uppercase">Equity</span>
              <span className="text-2xl font-headline font-extrabold text-on-surface">62%</span>
            </div>
          </div>
          <div className="w-full space-y-3 mt-auto">
            {[
              { label: "Equity", value: "₹ 42.8L", color: "bg-primary-container" },
              { label: "Debt", value: "₹ 18.2L", color: "bg-secondary" },
              { label: "Crypto/Gold", value: "₹ 8.5L", color: "bg-tertiary-fixed-dim" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                  <span className="text-on-surface/80">{item.label}</span>
                </div>
                <span className="font-bold text-on-surface">{item.value}</span>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setShowSimulator(true)}
            className="w-full mt-6 py-3 bg-surface-container-highest/50 border border-outline-variant/10 rounded-xl text-xs font-bold uppercase tracking-widest text-primary-container hover:bg-primary-container hover:text-on-primary transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw size={14} />
            Simulate Rebalance
          </button>
        </div>
      </section>

      <AnimatePresence>
        {showSimulator && (
          <motion.section 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-surface-container-low rounded-[2rem] p-8 border border-primary-container/20 shadow-[0_0_40px_rgba(0,255,65,0.05)] space-y-8">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary-container">
                    <ArrowRightLeft size={20} />
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-2xl text-on-surface">Rebalance Simulator</h3>
                    <p className="text-sm text-on-surface-variant">Adjust targets to see required trades</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowSimulator(false)}
                  className="text-xs font-bold text-on-surface-variant hover:text-on-surface uppercase tracking-widest"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-on-surface-variant uppercase tracking-widest border-b border-outline-variant/10 pb-2">
                    <Info size={14} />
                    Set Target Allocation
                  </div>
                  
                  {Object.entries(targets).map(([key, val]) => (
                    <div key={key} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-bold capitalize text-on-surface">{key}</label>
                        <span className="text-sm font-mono font-bold text-primary-container">{val}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={val}
                        onChange={(e) => setTargets(prev => ({ ...prev, [key]: parseInt(e.target.value) }))}
                        className="w-full h-1.5 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-primary-container"
                      />
                    </div>
                  ))}
                  
                  <div className={`p-4 rounded-xl text-xs font-bold flex justify-between items-center ${
                    (targets.equity + targets.debt + targets.crypto) === 100 
                      ? "bg-primary-container/10 text-primary-container border border-primary-container/20" 
                      : "bg-error-container/10 text-error border border-error/20"
                  }`}>
                    <span>Total Allocation</span>
                    <span>{targets.equity + targets.debt + targets.crypto}%</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-on-surface-variant uppercase tracking-widest border-b border-outline-variant/10 pb-2">
                    <RefreshCw size={14} />
                    Required Trades
                  </div>
                  
                  <div className="space-y-3">
                    {rebalanceData.map((item, i) => (
                      <div key={i} className="glass-card p-4 rounded-xl border border-outline-variant/5 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">{item.label}</p>
                          <p className={`text-sm font-bold ${item.action === "BUY" ? "text-primary-container" : "text-error"}`}>
                            {item.action} ₹{Math.abs(item.diff).toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-on-surface-variant/60 uppercase font-bold">New Target</p>
                          <p className="text-sm font-mono font-bold">₹{item.target.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={handleExecuteSimulation}
                    disabled={isExecuting || simulationSuccess}
                    className={`w-full py-4 font-headline font-extrabold rounded-xl shadow-[0_10px_20px_rgba(0,255,65,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
                      simulationSuccess ? "bg-primary-container text-on-primary" : "bg-primary-container text-on-primary"
                    }`}
                  >
                    {isExecuting ? <Loader2 className="animate-spin" size={20} /> : simulationSuccess ? <CheckCircle2 size={20} /> : null}
                    {isExecuting ? "Executing..." : simulationSuccess ? "Simulation Executed" : "Execute Simulation"}
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-headline font-bold text-2xl text-on-surface">AI Investment Strategist</h3>
            <p className="text-sm text-on-surface-variant">Personalized alpha opportunities based on your profile</p>
          </div>
          <button 
            onClick={generateAIRecommendations}
            disabled={isGenerating}
            className="bg-primary-container text-on-primary px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,65,0.2)] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
          >
            {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
            {recommendations.length > 0 ? "Refresh Analysis" : "Generate Recommendations"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {isGenerating && recommendations.length === 0 && (
              [1, 2, 3].map((i) => (
                <motion.div 
                  key={`skeleton-${i}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass-card h-64 rounded-3xl border border-outline-variant/10 animate-pulse bg-surface-container-highest/20"
                />
              ))
            )}
            
            {recommendations.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-3xl border border-outline-variant/10 flex flex-col space-y-4 hover:bg-surface-container-highest/30 transition-colors group"
              >
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary-container">
                    <Target size={20} />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase font-bold text-on-surface-variant/60">Confidence</p>
                    <span className="text-sm font-extrabold text-primary-container">{rec.confidence}%</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg text-on-surface group-hover:text-primary-container transition-colors">{rec.title}</h4>
                  <p className="text-xs font-bold text-secondary uppercase tracking-widest mt-1">{rec.action}</p>
                </div>

                <div className="bg-surface-container-lowest/40 p-3 rounded-xl border border-outline-variant/5">
                  <div className="flex items-center gap-2 mb-1">
                    <Lightbulb size={12} className="text-tertiary-fixed-dim" />
                    <span className="text-[10px] uppercase font-bold text-tertiary-fixed-dim">AI Reasoning</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    {rec.reasoning}
                  </p>
                </div>

                <div className="mt-auto pt-4 border-t border-outline-variant/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase">Projected Impact</span>
                  <span className="text-xs font-bold text-primary-container">{rec.impact}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {recommendations.length === 0 && !isGenerating && (
          <div className="glass-card p-12 rounded-[2.5rem] border border-outline-variant/10 text-center space-y-4 bg-surface-container-low/30">
            <div className="w-16 h-16 rounded-2xl bg-surface-container-highest flex items-center justify-center mx-auto text-on-surface-variant/40">
              <BrainCircuit size={32} />
            </div>
            <div className="max-w-sm mx-auto">
              <h4 className="font-bold text-on-surface">Ready for AI Analysis?</h4>
              <p className="text-sm text-on-surface-variant">Tap the button above to let FinMentor AI scan your portfolio for personalized growth opportunities.</p>
            </div>
          </div>
        )}
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-headline font-bold text-2xl text-on-surface">Holding Insights</h3>
          <button 
            onClick={() => setShowAddHolding(true)}
            className="px-4 py-2 bg-primary-container/10 text-primary-container border border-primary-container/20 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary-container hover:text-on-primary transition-all flex items-center gap-2"
          >
            <Plus size={14} />
            Add Holding
          </button>
        </div>
        <div className="space-y-4">
          {holdings.map((h, i) => (
            <div key={i} className="group bg-surface-container-low hover:bg-surface-container rounded-2xl p-6 transition-all duration-300 border border-outline-variant/5 cursor-pointer">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center font-bold ${h.positive ? "text-primary-fixed" : "text-secondary"}`}>
                    {h.symbol}
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">{h.name}</h4>
                    <span className="text-xs text-on-surface-variant">{h.sector} • {h.weight} Weight</span>
                  </div>
                </div>
                <div className="flex gap-12 text-right">
                  <div className="hidden sm:block">
                    <span className="text-xs text-on-surface-variant block uppercase tracking-tighter">Current Value</span>
                    <span className="font-bold">{h.value}</span>
                  </div>
                  <div>
                    <span className="text-xs text-on-surface-variant block uppercase tracking-tighter">Day Change</span>
                    <span className={`font-bold ${h.positive ? "text-primary-container" : "text-error"}`}>{h.change}</span>
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center bg-surface-container-highest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-headline font-bold text-2xl text-on-surface">Market News</h3>
          <button 
            onClick={() => setShowNewsModal(true)}
            className="text-xs font-bold text-primary-fixed-dim uppercase tracking-widest hover:underline"
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {marketNews.map((news, i) => (
            <div key={i} className="glass-card rounded-3xl overflow-hidden border border-outline-variant/10 group cursor-pointer">
              <div className="h-40 overflow-hidden">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary-container bg-primary-container/10 px-2 py-0.5 rounded">
                    {news.category}
                  </span>
                  <span className="text-[10px] text-on-surface-variant font-medium">{news.time}</span>
                </div>
                <h4 className="font-bold text-lg text-on-surface leading-tight group-hover:text-primary-container transition-colors">
                  {news.title}
                </h4>
                <p className="text-xs text-on-surface-variant">Source: {news.source}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {showNewsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNewsModal(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-surface-container rounded-[2.5rem] p-8 border border-outline-variant/10 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6">
                <button onClick={() => setShowNewsModal(false)} className="p-2 hover:bg-surface-container-highest rounded-full transition-colors">
                  <X size={24} className="text-on-surface-variant" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary-container">
                    <TrendingUp size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-headline font-bold text-primary">Market Intelligence</h3>
                    <p className="text-sm text-on-surface-variant uppercase tracking-widest font-bold">Latest Updates</p>
                  </div>
                </div>

                <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar space-y-4">
                  {[...marketNews, ...marketNews].map((news, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/10">
                      <img src={news.image} className="w-20 h-20 rounded-xl object-cover" alt="" referrerPolicy="no-referrer" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-bold text-primary-container uppercase">{news.category}</span>
                          <span className="text-[10px] text-on-surface-variant">{news.time}</span>
                        </div>
                        <h4 className="text-sm font-bold text-on-surface leading-tight">{news.title}</h4>
                        <p className="text-[10px] text-on-surface-variant mt-1">Source: {news.source}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddHolding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddHolding(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-surface-container rounded-[2.5rem] p-8 border border-outline-variant/10 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6">
                <button 
                  onClick={() => setShowAddHolding(false)}
                  className="p-2 hover:bg-surface-container-highest rounded-full transition-colors"
                >
                  <X size={24} className="text-on-surface-variant" />
                </button>
              </div>

              <form onSubmit={handleAddHolding} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary-container">
                    <Plus size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-headline font-bold text-primary">Add New Holding</h3>
                    <p className="text-sm text-on-surface-variant uppercase tracking-widest font-bold">Manual Entry</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-on-surface-variant">Asset Symbol</label>
                    <input 
                      required
                      type="text"
                      placeholder="e.g. BTC, AAPL, RELIANCE"
                      value={newHolding.symbol}
                      onChange={(e) => setNewHolding(prev => ({ ...prev, symbol: e.target.value.toUpperCase() }))}
                      className="w-full bg-surface-container-low border border-outline-variant/10 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary-container/30 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-on-surface-variant">Asset Name</label>
                    <input 
                      required
                      type="text"
                      placeholder="e.g. Bitcoin, Apple Inc."
                      value={newHolding.name}
                      onChange={(e) => setNewHolding(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-surface-container-low border border-outline-variant/10 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary-container/30 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-on-surface-variant">Amount / Quantity</label>
                    <input 
                      required
                      type="text"
                      placeholder="e.g. 0.5, 10, ₹50,000"
                      value={newHolding.amount}
                      onChange={(e) => setNewHolding(prev => ({ ...prev, amount: e.target.value }))}
                      className="w-full bg-surface-container-low border border-outline-variant/10 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary-container/30 transition-all"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setShowAddHolding(false)}
                    className="flex-1 py-4 bg-surface-container-highest text-on-surface font-bold rounded-xl hover:bg-surface-bright transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-primary-container text-on-primary font-headline font-extrabold rounded-xl shadow-[0_10px_20px_rgba(0,255,65,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Add to Portfolio
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
