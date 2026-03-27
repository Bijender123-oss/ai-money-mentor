import React, { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(email, "User");
      navigate("/");
    }, 1500);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background bg-mesh">
      <div className="w-full max-w-md relative">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary-container/10 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-secondary-container/10 blur-3xl rounded-full"></div>
        
        <div className="relative glass-card border border-outline-variant/15 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden">
          <div className="mb-10 text-center md:text-left">
            <h1 className="font-headline font-bold text-4xl tracking-tight text-primary mb-2">Welcome Back</h1>
            <p className="text-on-surface-variant text-sm tracking-wide uppercase font-label font-semibold opacity-70">
              Elevate your financial future
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-[0.15em] text-on-surface-variant ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
                <input
                  className="w-full bg-surface-container-lowest/50 border border-outline-variant/20 rounded-xl py-4 pl-12 pr-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container/30 focus:border-primary-container/50 transition-all duration-300 placeholder:text-on-surface-variant/30"
                  placeholder="name@nexus.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end px-1">
                <label className="text-xs font-bold uppercase tracking-[0.15em] text-on-surface-variant">
                  Password
                </label>
                <a className="text-xs font-semibold text-primary-fixed-dim hover:text-primary-container transition-colors duration-200" href="#">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
                <input
                  className="w-full bg-surface-container-lowest/50 border border-outline-variant/20 rounded-xl py-4 pl-12 pr-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container/30 focus:border-primary-container/50 transition-all duration-300 placeholder:text-on-surface-variant/30"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-container text-on-primary font-headline font-extrabold py-4 rounded-xl shadow-[0_0_20px_rgba(0,255,65,0.25)] hover:shadow-[0_0_30px_rgba(0,255,65,0.4)] active:scale-[0.98] transition-all duration-300 flex justify-center items-center gap-2 group disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Log In
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-10 flex items-center">
            <div className="flex-grow border-t border-outline-variant/10"></div>
            <span className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant opacity-40">
              Or continue with
            </span>
            <div className="flex-grow border-t border-outline-variant/10"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-3 border border-outline-variant/20 rounded-xl bg-surface-container/30 hover:bg-surface-container-high/60 transition-colors duration-300 group">
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant group-hover:text-on-surface transition-colors">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 py-3 border border-outline-variant/20 rounded-xl bg-surface-container/30 hover:bg-surface-container-high/60 transition-colors duration-300 group">
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant group-hover:text-on-surface transition-colors">Apple</span>
            </button>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-on-surface-variant">
              New to FinMentor?{" "}
              <Link to="/signup" className="font-bold text-primary-fixed-dim hover:text-primary-container underline underline-offset-4 decoration-primary-container/30 transition-all">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
