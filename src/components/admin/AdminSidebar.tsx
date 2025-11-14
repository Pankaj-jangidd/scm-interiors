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
    <div className="flex flex-col h-full bg-[#6B5444] relative overflow-hidden">
      {/* Mobile Close */}
      <div className="lg:hidden absolute top-3 right-3 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onClose?.()}
          aria-label="Close sidebar"
        >
          <X className="h-6 w-6 text-[#FAF8F5]" />
        </Button>
      </div>

      {/* Profile */}
      <div className="p-6 border-b border-[#E5DDD5]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#FAF8F5]">
            <User className="h-6 w-6" style={{ color: "#6B5444" }} />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-[#FAF8F5]">
              Pankaj Kumar
            </h3>
            <p className="text-sm text-[#FAF8F5]/80">Admin / SCMi</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2 relative z-10">
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
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive ? "bg-white/10 font-semibold" : "hover:bg-white/5"
                  }`}
                  style={{
                    color: isActive ? "#FAF8F5" : "rgba(250, 248, 245, 0.85)",
                  }}
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
      <div className="p-4 border-t border-[#E5DDD5] space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start transition-all duration-300 hover:scale-[1.03] hover:bg-[#FAF8F5]/15"
          onClick={exportData}
          style={{
            borderColor: "#FAF8F5",
            color: "#FAF8F5",
            backgroundColor: "transparent",
          }}
        >
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start transition-all duration-300 hover:scale-[1.03] hover:bg-[#FAF8F5]/15"
          onClick={handleLogout}
          style={{
            borderColor: "#FAF8F5",
            color: "#FAF8F5",
            backgroundColor: "transparent",
          }}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
