import { ReactNode, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import AdminSidebar from "./AdminSidebar";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { isAuthenticated } = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen flex">
      {/* Overlay for Mobile */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar container (mobile slides from right) */}
      <div
        className={`
          fixed right-0 lg:static inset-y-0 z-50 w-64 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
        `}
        style={{ backgroundColor: "#1A1A1A" }}
      >
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen bg-white">
        {/* Header */}
        <header
          className={`px-6 py-4 md:py-5 flex items-center justify-between sticky top-0 z-30 shadow-sm transition-colors duration-300
            bg-[#1A1A1A] lg:bg-white border-b border-border`}
        >
          {/* Left Title */}
          <h1 className="font-serif font-bold tracking-tight flex-1 text-left text-xl md:text-2xl lg:text-2xl transition-all duration-300 text-white lg:text-foreground">
            <span className="block md:hidden flex items-center gap-2">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center font-serif font-bold text-white text-sm shadow-md flex-shrink-0">
                SCM
              </div>
              SCM INTERIORS
            </span>
            <span className="hidden md:block">
              SRI CHAMUNDESHWARI INTERIORS
            </span>
          </h1>

          {/* Hamburger / Close Button on RIGHT (mobile only) */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden scale-125 active:scale-110 transition-transform"
            onClick={() => setSidebarOpen((s) => !s)}
            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          >
            {sidebarOpen ? (
              <X size={28} className="text-white" />
            ) : (
              <Menu size={28} className="text-white" />
            )}
          </Button>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-8 bg-secondary/30">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
