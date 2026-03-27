import { Bell, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 w-full flex justify-between items-center px-6 py-4 z-50 bg-[#131313]/60 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/20">
          <img
            alt="User Profile"
            className="w-full h-full object-cover"
            src="https://picsum.photos/seed/user/100/100"
          />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-[#00FF41] tracking-tighter font-headline">
            FinMentor AI
          </h1>
          {user && <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest -mt-1">Hi, {user.name}</p>}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-[#00FF41] hover:opacity-80 transition-opacity duration-300 active:scale-90">
          <Bell size={24} />
        </button>
        <button 
          onClick={logout}
          className="text-error hover:opacity-80 transition-opacity duration-300 active:scale-90"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
