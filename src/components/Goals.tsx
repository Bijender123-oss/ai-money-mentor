import { Settings, Sparkles, Rocket, ShieldCheck, ArrowRight, Plus, X, Target, TrendingUp, Shield } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useState, useMemo } from "react";

export default function Goals() {
  const [age, setAge] = useState(28);
  const [retireAge, setRetireAge] = useState(45);
  const [income, setIncome] = useState(8500);
  const [expenses, setExpenses] = useState(3200);
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [riskLevel, setRiskLevel] = useState("Moderate-Aggressive");
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [showDetailedPlan, setShowDetailedPlan] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: "", target: "" });

  const [goals, setGoals] = useState([
    { title: "Dream House", target: 600000, current: 450000, icon: "Home", color: "secondary" },
    { title: "Tesla Model S", target: 90000, current: 36000, icon: "Car", color: "primary" },
    { title: "Masters Degree", target: 50000, current: 12000, icon: "GraduationCap", color: "tertiary" },
  ]);

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = {
      title: newGoal.title,
      target: Number(newGoal.target),
      current: 0,
      icon: "Target",
      color: "primary"
    };
    setGoals(prev => [...prev, newEntry]);
    setShowAddGoal(false);
    setNewGoal({ title: "", target: "" });
  };

  const handleRecalculate = () => {
    setIsRecalculating(true);
    setTimeout(() => setIsRecalculating(false), 1500);
  };

  const stats = useMemo(() => {
    const yearsToRetire = retireAge - age;
    const monthlySavings = income - expenses;
    const annualSavings = monthlySavings * 12;
    
    // Simple compound interest calculation (assuming 8% annual return)
    const rate = 0.08;
    const corpus = annualSavings * ((Math.pow(1 + rate, yearsToRetire) - 1) / rate);
    
    // Required SIP for a target corpus (let's say 25x annual expenses)
    const targetCorpus = expenses * 12 * 25;
    const rateMonthly = rate / 12;
    const months = yearsToRetire * 12;
    const requiredSIP = months > 0 ? targetCorpus / ((Math.pow(1 + rateMonthly, months) - 1) / rateMonthly) : 0;
    const sipPercentage = (requiredSIP / income) * 100;

    return {
      corpus,
      requiredSIP,
      sipPercentage: Math.min(sipPercentage, 100),
      yearsToRetire
    };
  }, [age, retireAge, income, expenses]);

  return (
    <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto space-y-8">
      <section className="mb-4">
        <h2 className="text-4xl font-extrabold font-headline tracking-tight text-primary mb-2">FIRE Planner</h2>
        <p className="text-on-surface-variant font-label text-sm uppercase tracking-widest opacity-80">
          Financial Independence, Retire Early
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Inputs */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container rounded-3xl p-8 space-y-8 border border-outline-variant/10">
            <h3 className="font-headline font-bold text-xl text-primary flex items-center gap-2">
              <Settings className="text-primary-container" size={24} />
              Your Parameters
            </h3>
            <div className="space-y-6">
              <div className="group">
                <label className="block text-[10px] uppercase tracking-[0.08em] font-bold text-on-surface-variant mb-2">
                  Current Age
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-4 text-primary focus:ring-2 focus:ring-primary-container/30 transition-all font-headline text-lg font-bold"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-sm">
                    years
                  </span>
                </div>
              </div>
              <div className="group">
                <label className="block text-[10px] uppercase tracking-[0.08em] font-bold text-on-surface-variant mb-2">
                  Retirement Age
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-4 text-primary focus:ring-2 focus:ring-primary-container/30 transition-all font-headline text-lg font-bold"
                    type="number"
                    value={retireAge}
                    onChange={(e) => setRetireAge(Number(e.target.value))}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-sm">
                    years
                  </span>
                </div>
              </div>
              <div className="group">
                <label className="block text-[10px] uppercase tracking-[0.08em] font-bold text-on-surface-variant mb-2">
                  Monthly Income
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-container font-bold">$</span>
                  <input
                    className="w-full bg-surface-container-low border-0 rounded-xl pl-10 pr-4 py-4 text-primary focus:ring-2 focus:ring-primary-container/30 transition-all font-headline text-lg font-bold"
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-[10px] uppercase tracking-[0.08em] font-bold text-on-surface-variant mb-2">
                  Monthly Expenses
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-fixed-dim font-bold">$</span>
                  <input
                    className="w-full bg-surface-container-low border-0 rounded-xl pl-10 pr-4 py-4 text-primary focus:ring-2 focus:ring-primary-container/30 transition-all font-headline text-lg font-bold"
                    type="number"
                    value={expenses}
                    onChange={(e) => setExpenses(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
            <button 
              onClick={handleRecalculate}
              disabled={isRecalculating}
              className="w-full py-4 bg-primary-container text-on-primary font-bold rounded-xl shadow-[0_0_20px_rgba(0,255,65,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all font-headline uppercase tracking-wider disabled:opacity-50"
            >
              {isRecalculating ? "Recalculating..." : "Recalculate Path"}
            </button>
          </div>
        </aside>

        {/* Right Column: Visualization & Recommendations */}
        <div className="lg:col-span-8 space-y-8">
          {/* Retirement Timeline Graph */}
          <div className="bg-surface-container rounded-3xl p-8 border border-outline-variant/10 relative overflow-hidden">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="font-headline font-bold text-xl text-primary">Wealth Projection</h3>
                <p className="text-sm text-on-surface-variant">
                  Estimated corpus at age {retireAge}: <span className="text-primary-container font-bold">${(stats.corpus / 1000000).toFixed(1)}M</span>
                </p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-surface-container-high rounded-full text-[10px] font-bold text-primary-container uppercase tracking-widest border border-primary-container/20">
                  AI Optimized
                </span>
              </div>
            </div>
            {/* Custom SVG Graph */}
            <div className="h-64 w-full relative group">
              <svg className="w-full h-full" viewBox="0 0 800 200">
                <line stroke="#353534" strokeWidth="1" x1="0" x2="800" y1="180" y2="180"></line>
                <line stroke="#353534" strokeDasharray="4" strokeWidth="1" x1="0" x2="800" y1="120" y2="120"></line>
                <line stroke="#353534" strokeDasharray="4" strokeWidth="1" x1="0" x2="800" y1="60" y2="60"></line>
                <motion.path
                  key={`${age}-${retireAge}-${income}-${expenses}`}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="drop-shadow-[0_0_8px_rgba(0,255,65,0.4)]"
                  d="M 0 180 Q 200 170, 400 120 T 800 20"
                  fill="none"
                  stroke="url(#neonGradient)"
                  strokeWidth="4"
                ></motion.path>
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                  transition={{ delay: 1, duration: 1 }}
                  d="M 0 180 Q 200 170, 400 120 T 800 20 L 800 180 L 0 180 Z"
                  fill="url(#areaGradient)"
                ></motion.path>
                <circle className="animate-pulse" cx="400" cy="120" fill="#00FF41" r="6"></circle>
                <defs>
                  <linearGradient id="neonGradient" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#72FF70"></stop>
                    <stop offset="100%" stopColor="#00FF41"></stop>
                  </linearGradient>
                  <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#00FF41"></stop>
                    <stop offset="100%" stopColor="transparent"></stop>
                  </linearGradient>
                </defs>
              </svg>
              <div className="flex justify-between mt-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                <span>Age {age} (Now)</span>
                <span>Age {Math.round(age + (retireAge - age) / 2)}</span>
                <span className="text-primary-container">Age {retireAge} (FIRE)</span>
                <span>Age {retireAge + 15}</span>
              </div>
            </div>
          </div>

          {/* SIP Recommendation & AI Insight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-3xl p-8 border border-primary-container/20 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-4">
                <Rocket className="text-primary-container/40 scale-150" size={24} />
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary-container mb-4">
                  Required Monthly SIP
                </h4>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-extrabold font-headline text-primary">${Math.round(stats.requiredSIP).toLocaleString()}</span>
                  <span className="text-on-surface-variant text-sm">/ month</span>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  To reach financial freedom in {stats.yearsToRetire} years, you need to invest {stats.sipPercentage.toFixed(1)}% of your monthly income.
                </p>
              </div>
              <div className="mt-8">
                <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                  <motion.div 
                    key={stats.sipPercentage}
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.sipPercentage}%` }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="bg-primary-container h-full shadow-[0_0_10px_rgba(0,255,65,0.5)]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-surface-container-high rounded-3xl p-8 border border-secondary/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="text-secondary" size={20} />
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-secondary">AI Strategy</h4>
                </div>
                <h5 className="font-headline font-bold text-lg mb-2 text-primary">The "Aggressive Growth" Route</h5>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  By allocating 15% more to Index-ETFs and reducing discretionary leisure spend by $400, you can retire at{" "}
                  <span className="text-secondary font-bold">42</span> instead.
                </p>
              </div>
              <button 
                onClick={() => setShowDetailedPlan(true)}
                className="mt-6 flex items-center justify-center gap-2 text-secondary font-bold text-sm uppercase tracking-widest hover:opacity-80 transition-opacity"
              >
                View Detailed Plan
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="bg-surface-container rounded-3xl p-6 flex items-center gap-6 border border-outline-variant/5">
            <div className="w-16 h-16 rounded-2xl bg-tertiary-container/10 flex items-center justify-center">
              <ShieldCheck className="text-tertiary-fixed-dim" size={32} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-primary">{riskLevel} Risk</h4>
              <p className="text-xs text-on-surface-variant">
                Portfolio volatility is currently optimized for long-term growth.
              </p>
            </div>
            <button 
              onClick={() => setShowRiskModal(true)}
              className="px-4 py-2 rounded-xl bg-surface-container-highest text-xs font-bold uppercase tracking-widest hover:bg-surface-bright transition-colors"
            >
              Adjust
            </button>
          </div>
        </div>
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-headline font-bold text-2xl text-on-surface">Your Milestones</h3>
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{goals.length} active goals</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal, i) => {
            const progress = (goal.current / goal.target) * 100;
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface-container-high p-6 rounded-[2rem] border border-outline-variant/5 hover:bg-surface-container-highest transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 rounded-2xl ${
                    goal.color === "secondary" ? "bg-secondary/10 text-secondary" :
                    goal.color === "tertiary" ? "bg-tertiary-container/10 text-tertiary-fixed-dim" :
                    "bg-primary-container/10 text-primary-container"
                  }`}>
                    <Target size={24} />
                  </div>
                  <span className="text-xs font-bold text-on-surface-variant">{Math.round(progress)}%</span>
                </div>
                <h4 className="font-headline font-bold text-lg mb-1">{goal.title}</h4>
                <p className="text-sm text-on-surface-variant mb-6">
                  ${(goal.current / 1000).toFixed(0)}k / ${(goal.target / 1000).toFixed(0)}k
                </p>
                <div className="w-full h-1.5 bg-surface-container-lowest rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    className={`h-full rounded-full ${
                      goal.color === "secondary" ? "bg-secondary" :
                      goal.color === "tertiary" ? "bg-tertiary-fixed-dim" :
                      "bg-primary-container"
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <button 
        onClick={() => setShowAddGoal(true)}
        className="fixed right-6 bottom-24 w-14 h-14 bg-primary-container text-on-primary rounded-full shadow-[0_8px_32px_rgba(0,255,65,0.4)] flex items-center justify-center z-40 hover:scale-110 active:scale-95 transition-transform"
      >
        <Plus size={24} />
      </button>

      <AnimatePresence>
        {showRiskModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRiskModal(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-surface-container rounded-[2.5rem] p-8 border border-outline-variant/10 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6">
                <button onClick={() => setShowRiskModal(false)} className="p-2 hover:bg-surface-container-highest rounded-full transition-colors">
                  <X size={24} className="text-on-surface-variant" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-tertiary-container/10 flex items-center justify-center text-tertiary-fixed-dim">
                    <Shield size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-headline font-bold text-primary">Risk Profile</h3>
                    <p className="text-sm text-on-surface-variant uppercase tracking-widest font-bold">Adjust your tolerance</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {["Conservative", "Moderate", "Moderate-Aggressive", "Aggressive"].map((level) => (
                    <button
                      key={level}
                      onClick={() => {
                        setRiskLevel(level);
                        setShowRiskModal(false);
                      }}
                      className={`w-full p-4 rounded-2xl text-left transition-all border ${
                        riskLevel === level 
                          ? "bg-primary-container/10 border-primary-container text-primary-container" 
                          : "bg-surface-container-low border-outline-variant/10 text-on-surface-variant hover:border-primary-container/30"
                      }`}
                    >
                      <span className="font-bold">{level}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddGoal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddGoal(false)}
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
                  onClick={() => setShowAddGoal(false)}
                  className="p-2 hover:bg-surface-container-highest rounded-full transition-colors"
                >
                  <X size={24} className="text-on-surface-variant" />
                </button>
              </div>

              <form onSubmit={handleAddGoal} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary-container">
                    <Target size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-headline font-bold text-primary">New Financial Goal</h3>
                    <p className="text-sm text-on-surface-variant uppercase tracking-widest font-bold">Define your milestone</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-on-surface-variant">Goal Title</label>
                    <input 
                      required
                      type="text"
                      placeholder="e.g. World Tour, New Tesla, Kids College"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full bg-surface-container-low border border-outline-variant/10 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary-container/30 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-on-surface-variant">Target Amount ($)</label>
                    <input 
                      required
                      type="number"
                      placeholder="e.g. 50000"
                      value={newGoal.target}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, target: e.target.value }))}
                      className="w-full bg-surface-container-low border border-outline-variant/10 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary-container/30 transition-all"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setShowAddGoal(false)}
                    className="flex-1 py-4 bg-surface-container-highest text-on-surface font-bold rounded-xl hover:bg-surface-bright transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-primary-container text-on-primary font-headline font-extrabold rounded-xl shadow-[0_10px_20px_rgba(0,255,65,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Create Goal
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDetailedPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDetailedPlan(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-surface-container rounded-[2.5rem] p-8 border border-outline-variant/10 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6">
                <button 
                  onClick={() => setShowDetailedPlan(false)}
                  className="p-2 hover:bg-surface-container-highest rounded-full transition-colors"
                >
                  <X size={24} className="text-on-surface-variant" />
                </button>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Sparkles size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-headline font-bold text-primary">Aggressive Growth Strategy</h3>
                    <p className="text-sm text-on-surface-variant uppercase tracking-widest font-bold">Detailed Roadmap</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Target className="text-primary-container" size={20} />
                      <h4 className="font-bold text-on-surface">Asset Allocation</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-on-surface-variant">
                      <li className="flex justify-between"><span>Large Cap Index</span> <span className="font-bold text-on-surface">45%</span></li>
                      <li className="flex justify-between"><span>Mid/Small Cap</span> <span className="font-bold text-on-surface">25%</span></li>
                      <li className="flex justify-between"><span>International Equity</span> <span className="font-bold text-on-surface">20%</span></li>
                      <li className="flex justify-between"><span>Crypto/Gold</span> <span className="font-bold text-on-surface">10%</span></li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="text-secondary" size={20} />
                      <h4 className="font-bold text-on-surface">Savings Optimization</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-on-surface-variant">
                      <li className="flex justify-between"><span>Tax-Loss Harvesting</span> <span className="text-primary-container font-bold">+$1.2k/yr</span></li>
                      <li className="flex justify-between"><span>Expense Reduction</span> <span className="text-primary-container font-bold">-$400/mo</span></li>
                      <li className="flex justify-between"><span>Dividend Reinvest</span> <span className="text-primary-container font-bold">Enabled</span></li>
                    </ul>
                  </div>
                </div>

                <div className="bg-surface-container-highest/30 p-6 rounded-3xl border border-outline-variant/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="text-tertiary-fixed-dim" size={20} />
                    <h4 className="font-bold text-on-surface">Risk Mitigation</h4>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    This strategy maintains a 6-month emergency fund in liquid debt instruments while maximizing equity exposure. 
                    Rebalancing is recommended every 90 days to maintain the 70/30 equity-to-debt ratio.
                  </p>
                </div>

                <button 
                  onClick={() => setShowDetailedPlan(false)}
                  className="w-full py-4 bg-primary-container text-on-primary font-headline font-extrabold rounded-xl shadow-[0_10px_20px_rgba(0,255,65,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Apply Strategy
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
