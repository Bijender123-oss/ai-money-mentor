import React, { useState } from "react";
import { User, Mail, Lock, Eye, ShieldCheck, Sparkles, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(email, name);
      navigate("/");
    }, 1500);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background bg-mesh">
      <div className="w-full max-w-md relative">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary-container/10 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-secondary-container/10 blur-3xl rounded-full"></div>

        <div className="glass-card border border-outline-variant/15 rounded-[2rem] p-8 md:p-10 relative overflow-hidden">
          <div className="flex justify-center mb-8">
            <div className="bg-surface-container-highest/50 px-4 py-1.5 rounded-full border border-outline-variant/20 flex items-center gap-2">
              <ShieldCheck className="text-primary-fixed-dim" size={18} />
              <span className="font-label text-[10px] uppercase tracking-[0.15em] font-bold text-on-surface-variant">
                AI-Powered Security
              </span>
            </div>
          </div>

          <div className="text-center mb-10">
            <h2 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface mb-2">Create Account</h2>
            <p className="font-body text-sm text-on-surface-variant">Join the future of intelligent wealth management</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block font-label text-[10px] uppercase tracking-[0.1em] font-bold text-on-surface-variant ml-1">
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors group-focus-within:text-primary-container" size={18} />
                <input
                  className="w-full bg-surface-container-lowest border border-outline-variant/15 rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary-container/30 focus:border-primary-container/40 transition-all outline-none"
                  placeholder="Enter your name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-label text-[10px] uppercase tracking-[0.1em] font-bold text-on-surface-variant ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors group-focus-within:text-primary-container" size={18} />
                <input
                  className="w-full bg-surface-container-lowest border border-outline-variant/15 rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary-container/30 focus:border-primary-container/40 transition-all outline-none"
                  placeholder="name@domain.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-label text-[10px] uppercase tracking-[0.1em] font-bold text-on-surface-variant ml-1">
                Security Key
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors group-focus-within:text-primary-container" size={18} />
                <input
                  className="w-full bg-surface-container-lowest border border-outline-variant/15 rounded-xl py-4 pl-12 pr-12 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary-container/30 focus:border-primary-container/40 transition-all outline-none"
                  placeholder="Min. 8 characters"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Eye className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant cursor-pointer hover:text-on-surface" size={18} />
              </div>
            </div>

            <div className="flex items-start gap-3 px-1 pt-2">
              <div className="flex items-center h-5">
                <input
                  className="w-4 h-4 rounded border-outline-variant/30 bg-surface-container-low text-primary-container focus:ring-primary-container/50"
                  id="terms"
                  type="checkbox"
                  required
                />
              </div>
              <label className="text-[12px] text-on-surface-variant leading-tight" htmlFor="terms">
                I agree to the{" "}
                <a className="text-primary-fixed-dim hover:underline transition-all" href="#">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a className="text-primary-fixed-dim hover:underline transition-all" href="#">
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-container py-4 rounded-xl font-headline font-bold text-on-primary text-sm uppercase tracking-[0.05em] neon-glow transform transition-transform active:scale-[0.98] hover:brightness-110 flex justify-center items-center disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-outline-variant/10 text-center">
            <p className="font-body text-sm text-on-surface-variant">
              Already have an account?{" "}
              <Link to="/login" className="text-[#00FF41] font-bold hover:text-[#72FF70] transition-colors ml-1">
                Log in
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4">
          <div className="glass-card p-4 rounded-2xl border border-outline-variant/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary-container">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">AI Insight</p>
              <p className="text-[12px] font-semibold">99.8% Prediction Accuracy</p>
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl border border-outline-variant/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-secondary">
              <Shield size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Encryption</p>
              <p className="text-[12px] font-semibold">AES-256 Grade Security</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
