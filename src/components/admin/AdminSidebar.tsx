import { Link, useLocation } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Image,
  MessageSquare,
  Mail,
  Settings,
  LogOut,
  Download,
  User,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  onClose?: () => void;
}

const AdminSidebar = ({ onClose }: AdminSidebarProps) => {
  const location = useLocation();
  const { logout, exportData } = useAdmin();

  const navItems = [
    { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/gallery", icon: Image, label: "Gallery" },
    { path: "/admin/reviews", icon: MessageSquare, label: "Reviews" },
    { path: "/admin/contacts", icon: Mail, label: "Contacts" },
    { path: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = "/admin";
  };

  return (
    <div className="flex flex-col h-full bg-[#1A1A1A] relative overflow-hidden">
      {/* Mobile Close */}
      <div className="lg:hidden absolute top-3 right-3 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onClose?.()}
          aria-label="Close sidebar"
        >
          <X className="h-6 w-6 text-white" />
        </Button>
      </div>

      {/* Profile */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-accent">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white">Pankaj Kumar</h3>
            <p className="text-sm text-white/60">Admin / SCMi</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1 relative z-10">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => onClose?.()}
                className="block"
              >
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-accent text-white font-semibold"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start transition-all duration-300 hover:scale-[1.02] border-white/20 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/40"
          onClick={exportData}
        >
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start transition-all duration-300 hover:scale-[1.02] border-white/20 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/40"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
