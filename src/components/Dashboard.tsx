import { TrendingUp, Home, Car, GraduationCap, Sparkles, ArrowRight, Wand2, Zap, X, Landmark, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showSavingsModal, setShowSavingsModal] = useState(false);

  return (
    <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto space-y-8">
      {/* Welcome & AI Market Pulse */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-headline text-primary">
            Welcome back, {user?.name.split(' ')[0] || "Alex"}!
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Your financial health is looking <span className="text-primary-container font-bold">excellent</span> today.
          </p>
        </div>
        <div className="glass-card px-4 py-2 rounded-full border border-primary-container/20 flex items-center gap-3 animate-pulse">
          <Zap size={16} className="text-primary-container" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary-container">
            AI Market Pulse: Bullish on Tech & Green Energy
          </span>
        </div>
      </section>

      {/* Hero Section: Net Worth Asymmetric Layout */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-8 glass-card rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden group"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-container/10 rounded-full blur-[80px]"></div>
          <div>
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold">
              Total Net Worth
            </span>
            <h2 className="text-5xl md:text-6xl font-headline font-extrabold tracking-tight mt-2 text-primary">
              $248,392.15
            </h2>
            <div className="flex items-center gap-2 mt-4">
              <span className="flex items-center text-primary-fixed bg-on-primary-container/20 px-3 py-1 rounded-full text-sm font-bold">
                <TrendingUp size={16} className="mr-1" />
                +12.4%
              </span>
              <span className="text-on-surface-variant text-sm tracking-wide">
                vs last month
              </span>
            </div>
          </div>
          {/* Mini Chart Visual */}
          <div className="mt-12 h-32 w-full flex items-end gap-1">
            {[40, 60, 55, 80, 70, 95].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className={`w-full rounded-t-lg transition-all duration-700 ${
                  i === 5 ? "bg-primary-container/40 shadow-[0_0_15px_rgba(0,255,65,0.2)]" : "bg-primary-container/20"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Money Health Circular Progress */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-4 bg-surface-container rounded-[2rem] p-8 flex flex-col items-center justify-center text-center relative"
        >
          <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-6">
            Health Score
          </span>
          <div className="relative flex items-center justify-center">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle
                className="text-surface-container-highest"
                cx="96"
                cy="96"
                fill="transparent"
                r="80"
                stroke="currentColor"
                strokeWidth="8"
              ></circle>
              <motion.circle
                className="text-primary-container neon-glow"
                cx="96"
                cy="96"
                fill="transparent"
                r="80"
                stroke="currentColor"
                strokeDasharray="502.4"
                initial={{ strokeDashoffset: 502.4 }}
                animate={{ strokeDashoffset: 100.48 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                strokeLinecap="round"
                strokeWidth="12"
              ></motion.circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-headline font-extrabold text-primary">82</span>
              <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">
                Excellent
              </span>
            </div>
          </div>
          <p className="text-sm text-on-surface-variant mt-6 leading-relaxed max-w-[200px]">
            You're in the top <span className="text-primary-fixed">5%</span> of savers in your bracket.
          </p>
        </motion.div>
      </section>

      {/* Goal Progress & AI Insights Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Goals Section */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex justify-between items-end">
            <h3 className="text-xl font-headline font-bold text-on-surface">Financial Milestones</h3>
            <button 
              onClick={() => navigate("/goals")}
              className="text-xs font-bold uppercase tracking-widest text-primary-fixed hover:underline transition-all"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Goal: House */}
            <div className="bg-surface-container-high p-6 rounded-3xl group hover:bg-surface-container-highest transition-colors duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-on-secondary-container/10 rounded-2xl text-secondary">
                  <Home size={24} />
                </div>
                <span className="text-xs font-bold text-on-surface-variant">75%</span>
              </div>
              <h4 className="font-headline font-bold text-lg mb-1">Dream House</h4>
              <p className="text-sm text-on-surface-variant mb-6">$450k / $600k</p>
              <div className="w-full h-1.5 bg-surface-container-lowest rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-secondary-container rounded-full"
                />
              </div>
            </div>
            {/* Goal: Car */}
            <div className="bg-surface-container-high p-6 rounded-3xl group hover:bg-surface-container-highest transition-colors duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-primary-container/10 rounded-2xl text-primary-container">
                  <Car size={24} />
                </div>
                <span className="text-xs font-bold text-on-surface-variant">40%</span>
              </div>
              <h4 className="font-headline font-bold text-lg mb-1">Tesla Model S</h4>
              <p className="text-sm text-on-surface-variant mb-6">$36k / $90k</p>
              <div className="w-full h-1.5 bg-surface-container-lowest rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "40%" }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="h-full bg-primary-container rounded-full"
                />
              </div>
            </div>
            {/* Goal: Education */}
            <div className="bg-surface-container-high p-6 rounded-3xl group hover:bg-surface-container-highest transition-colors duration-300 sm:col-span-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-tertiary-container/10 rounded-2xl text-tertiary-fixed-dim">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-lg mb-0.5">Masters Degree</h4>
                    <p className="text-sm text-on-surface-variant">$12k / $50k</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 w-1/2">
                  <span className="text-xs font-bold text-on-surface-variant">24% achieved</span>
                  <div className="w-full h-1.5 bg-surface-container-lowest rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "24%" }}
                      transition={{ duration: 1, delay: 0.7 }}
                      className="h-full bg-tertiary-fixed-dim rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles size={24} className="text-primary-container" />
            <h3 className="text-xl font-headline font-bold text-on-surface">AI Insights</h3>
          </div>
          <div className="space-y-4">
            {/* Suggestion Card 1 */}
            <div className="glass-card p-6 rounded-3xl border border-outline-variant/10 hover:border-primary-container/30 transition-all duration-500 cursor-pointer">
              <p className="text-primary-fixed text-xs font-bold uppercase tracking-[0.1em] mb-2">
                Optimization Opportunity
              </p>
              <h5 className="font-headline font-bold text-white mb-2 leading-tight">
                Switch to High-Yield Savings
              </h5>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Your current APR is 0.5%. We found a 4.5% option that earns you $340 more monthly.
              </p>
              <button 
                onClick={() => setShowSavingsModal(true)}
                className="mt-4 flex items-center text-primary-container font-bold text-sm group"
              >
                Learn more
                <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            {/* Suggestion Card 2 */}
            <div className="glass-card p-6 rounded-3xl border border-outline-variant/10 hover:border-secondary-fixed/30 transition-all duration-500 cursor-pointer">
              <p className="text-secondary-fixed-dim text-xs font-bold uppercase tracking-[0.1em] mb-2">
                Portfolio Rebalance
              </p>
              <h5 className="font-headline font-bold text-white mb-2 leading-tight">
                Increase Index Fund Allocation
              </h5>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Tech exposure is at 72%. Diversify into S&P 500 to reduce volatility risk by 12%.
              </p>
              <button 
                onClick={() => navigate("/portfolio")}
                className="mt-4 flex items-center text-secondary-fixed-dim font-bold text-sm group"
              >
                Rebalance now
                <Wand2 size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showSavingsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSavingsModal(false)}
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
                  onClick={() => setShowSavingsModal(false)}
                  className="p-2 hover:bg-surface-container-highest rounded-full transition-colors"
                >
                  <X size={24} className="text-on-surface-variant" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary-container">
                    <Landmark size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-headline font-bold text-primary">High-Yield Savings</h3>
                    <p className="text-sm text-on-surface-variant uppercase tracking-widest font-bold">Optimization Details</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-surface-container-highest/30 rounded-2xl border border-outline-variant/10">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-on-surface-variant">Current APR</span>
                      <span className="text-lg font-bold text-error">0.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-on-surface-variant">Recommended APR</span>
                      <span className="text-lg font-bold text-primary-container">4.5%</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-primary-container/5 rounded-2xl border border-primary-container/10">
                    <TrendingUp className="text-primary-container shrink-0" size={20} />
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      By switching to a high-yield account, you'll earn an additional <span className="text-primary-container font-bold">$340 per month</span> based on your current cash balance of $102,000.
                    </p>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-surface-container-highest/30 rounded-2xl border border-outline-variant/10">
                    <ShieldCheck className="text-tertiary-fixed-dim shrink-0" size={20} />
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      All recommended banks are FDIC insured up to $250,000, ensuring your principal is safe while earning maximum yield.
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => setShowSavingsModal(false)}
                  className="w-full py-4 bg-primary-container text-on-primary font-headline font-extrabold rounded-xl shadow-[0_10px_20px_rgba(0,255,65,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Open High-Yield Account
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
