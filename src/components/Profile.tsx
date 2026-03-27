import { User, Shield, CreditCard, Bell, LogOut, ChevronRight, Camera, X, Mail, Phone, MapPin, Key, Smartphone, Globe, Plus, Trash2, Landmark, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Profile() {
  const { user, logout } = useAuth();
  const [profilePic, setProfilePic] = useState("https://picsum.photos/seed/user/200/200");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || "User",
    email: user?.email || "bijenderyadav957@gmail.com",
    phone: "+1 (555) 000-0000",
    location: "San Francisco, CA"
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: true
  });

  const [notifications, setNotifications] = useState([
    { id: "market", label: "Market Alerts", desc: "Significant price movements in your holdings", enabled: true },
    { id: "ai", label: "AI Insights", desc: "New personalized financial recommendations", enabled: true },
    { id: "security", label: "Security Alerts", desc: "Login attempts and security changes", enabled: true },
    { id: "weekly", label: "Weekly Digest", desc: "Summary of your financial progress", enabled: false },
  ]);

  const handleSaveChanges = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Settings updated successfully!");
      setActiveSection(null);
    }, 1000);
  };

  const toggleNotification = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const menuItems = [
    { id: "personal", icon: User, label: "Personal Information", desc: "Manage your profile data" },
    { id: "security", icon: Shield, label: "Security & Privacy", desc: "Password and 2FA settings" },
    { id: "accounts", icon: CreditCard, label: "Linked Accounts", desc: "Bank and brokerage connections" },
    { id: "notifications", icon: Bell, label: "Notifications", desc: "Alerts and daily digests" },
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case "personal":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-on-surface-variant">Full Name</label>
                <div className="flex items-center gap-3 p-4 bg-surface-container-low rounded-xl border border-outline-variant/10 focus-within:border-primary-container/30 transition-colors">
                  <User size={18} className="text-primary-container" />
                  <input 
                    type="text"
                    value={personalInfo.name}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                    className="bg-transparent border-none focus:ring-0 text-sm font-bold w-full text-on-surface"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-on-surface-variant">Email Address</label>
                <div className="flex items-center gap-3 p-4 bg-surface-container-low rounded-xl border border-outline-variant/10 focus-within:border-primary-container/30 transition-colors">
                  <Mail size={18} className="text-primary-container" />
                  <input 
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    className="bg-transparent border-none focus:ring-0 text-sm font-bold w-full text-on-surface"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-on-surface-variant">Phone Number</label>
                <div className="flex items-center gap-3 p-4 bg-surface-container-low rounded-xl border border-outline-variant/10 focus-within:border-primary-container/30 transition-colors">
                  <Phone size={18} className="text-primary-container" />
                  <input 
                    type="text"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                    className="bg-transparent border-none focus:ring-0 text-sm font-bold w-full text-on-surface"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-on-surface-variant">Location</label>
                <div className="flex items-center gap-3 p-4 bg-surface-container-low rounded-xl border border-outline-variant/10 focus-within:border-primary-container/30 transition-colors">
                  <MapPin size={18} className="text-primary-container" />
                  <input 
                    type="text"
                    value={personalInfo.location}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                    className="bg-transparent border-none focus:ring-0 text-sm font-bold w-full text-on-surface"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case "security":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/10">
                <div className="flex items-center gap-3">
                  <Key size={18} className="text-secondary" />
                  <div>
                    <p className="text-sm font-bold">Password</p>
                    <p className="text-[10px] text-on-surface-variant">Last changed 3 months ago</p>
                  </div>
                </div>
                <button 
                  onClick={() => toast.info("Password reset link sent to your email.")}
                  className="text-xs font-bold text-primary-container uppercase tracking-widest hover:underline"
                >
                  Change
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/10">
                <div className="flex items-center gap-3">
                  <Smartphone size={18} className="text-secondary" />
                  <div>
                    <p className="text-sm font-bold">Two-Factor Authentication</p>
                    <p className="text-[10px] text-on-surface-variant">Secure your account with 2FA</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSecuritySettings({ ...securitySettings, twoFactor: !securitySettings.twoFactor })}
                  className={`w-10 h-5 rounded-full relative transition-colors ${securitySettings.twoFactor ? "bg-primary-container" : "bg-surface-container-highest"}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${securitySettings.twoFactor ? "right-1" : "left-1"}`}></div>
                </button>
              </div>
            </div>
          </div>
        );
      case "accounts":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {[
                { name: "Chase Bank", type: "Savings", balance: "$42,000", icon: Landmark },
                { name: "Robinhood", type: "Brokerage", balance: "$156,000", icon: TrendingUp },
                { name: "Coinbase", type: "Crypto", balance: "$12,400", icon: Globe },
              ].map((acc, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/10">
                  <div className="flex items-center gap-3">
                    <acc.icon size={18} className="text-tertiary-fixed-dim" />
                    <div>
                      <p className="text-sm font-bold">{acc.name}</p>
                      <p className="text-[10px] text-on-surface-variant">{acc.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{acc.balance}</p>
                    <button 
                      onClick={() => toast.info(`Disconnecting ${acc.name}...`)}
                      className="text-[10px] font-bold text-error uppercase tracking-widest"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              ))}
              <button 
                onClick={() => toast.info("Redirecting to Plaid for secure account linking...")}
                className="w-full py-4 border-2 border-dashed border-outline-variant/20 rounded-xl flex items-center justify-center gap-2 text-on-surface-variant hover:border-primary-container/30 hover:text-primary-container transition-all"
              >
                <Plus size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Link New Account</span>
              </button>
            </div>
          </div>
        );
      case "notifications":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {notifications.map((notif, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/10">
                  <div className="flex-1 pr-4">
                    <p className="text-sm font-bold">{notif.label}</p>
                    <p className="text-[10px] text-on-surface-variant">{notif.desc}</p>
                  </div>
                  <button 
                    onClick={() => toggleNotification(notif.id)}
                    className={`w-10 h-5 rounded-full relative transition-colors ${notif.enabled ? "bg-primary-container" : "bg-surface-container-highest"}`}
                  >
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${notif.enabled ? "right-1" : "left-1"}`}></div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="pt-24 pb-32 px-6 max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full border-4 border-primary-container/20 overflow-hidden shadow-2xl relative">
            <img
              alt="User Profile"
              className="w-full h-full object-cover"
              src={profilePic}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Camera size={24} className="text-white" />
            </button>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold font-headline text-primary">{personalInfo.name}</h2>
          <p className="text-on-surface-variant text-sm">{personalInfo.email}</p>
          <p className="text-on-surface-variant text-[10px] uppercase font-bold tracking-widest mt-1 opacity-60">Premium Member since 2023</p>
        </div>
        <div className="flex gap-4">
          <span className="px-4 py-1.5 bg-primary-container/10 text-primary-container rounded-full text-xs font-bold uppercase tracking-widest border border-primary-container/20">
            High Saver
          </span>
          <span className="px-4 py-1.5 bg-secondary-container/10 text-secondary rounded-full text-xs font-bold uppercase tracking-widest border border-secondary/20">
            Growth Risk
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {menuItems.map((item, i) => (
          <button
            key={i}
            onClick={() => setActiveSection(item.id)}
            className="w-full glass-card p-5 rounded-2xl flex items-center justify-between group hover:bg-surface-container-highest/40 transition-all border border-outline-variant/5"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-surface-container-high rounded-xl text-on-surface-variant group-hover:text-primary-container transition-colors">
                <item.icon size={20} />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-on-surface">{item.label}</h4>
                <p className="text-xs text-on-surface-variant">{item.desc}</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-on-surface-variant group-hover:translate-x-1 transition-transform" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeSection && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSection(null)}
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
                  onClick={() => setActiveSection(null)}
                  className="p-2 hover:bg-surface-container-highest rounded-full transition-colors"
                >
                  <X size={24} className="text-on-surface-variant" />
                </button>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary-container">
                    {React.createElement(menuItems.find(m => m.id === activeSection)?.icon || User, { size: 28 })}
                  </div>
                  <div>
                    <h3 className="text-2xl font-headline font-bold text-primary">
                      {menuItems.find(m => m.id === activeSection)?.label}
                    </h3>
                    <p className="text-sm text-on-surface-variant uppercase tracking-widest font-bold">Settings & Management</p>
                  </div>
                </div>

                <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  {renderSectionContent()}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => setActiveSection(null)}
                    className="flex-1 py-4 bg-surface-container-highest text-on-surface font-bold rounded-xl hover:bg-surface-bright transition-all"
                  >
                    Close
                  </button>
                  <button 
                    onClick={handleSaveChanges}
                    disabled={isSaving}
                    className="flex-1 py-4 bg-primary-container text-on-primary font-headline font-extrabold rounded-xl shadow-[0_10px_20px_rgba(0,255,65,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                  <button 
                    onClick={logout}
                    className="flex-1 py-4 bg-error-container/10 text-error border border-error/20 font-bold rounded-xl hover:bg-error-container/20 transition-all flex items-center justify-center gap-2"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <button 
        onClick={logout}
        className="w-full py-4 rounded-2xl bg-error-container/10 text-error border border-error/20 font-bold flex items-center justify-center gap-2 hover:bg-error-container/20 transition-all"
      >
        <LogOut size={20} />
        Sign Out
      </button>
    </main>
  );
}
