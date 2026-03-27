import { Link, useLocation } from "react-router-dom";
import { Grid2X2, MessageSquare, Wallet, Target, User } from "lucide-react";

export default function BottomNav() {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    { icon: Grid2X2, label: "Home", path: "/" },
    { icon: MessageSquare, label: "Chat", path: "/chat" },
    { icon: Wallet, label: "Portfolio", path: "/portfolio" },
    { icon: Target, label: "Goals", path: "/goals" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-[#201F1F]/80 backdrop-blur-2xl rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      {navItems.map((item) => {
        const isActive = path === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
              isActive
                ? "text-[#00FF41] bg-[#72FF70]/10 rounded-2xl px-4 py-2 shadow-[0_0_15px_rgba(0,255,65,0.15)]"
                : "text-gray-500 opacity-60 hover:text-[#72FF70]"
            }`}
          >
            <item.icon size={24} className="mb-1" />
            <span className="font-headline text-[10px] uppercase tracking-[0.08em] font-bold">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
