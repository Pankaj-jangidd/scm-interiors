import { NavLink } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Image, 
  MessageSquare, 
  Mail, 
  Settings, 
  LogOut,
  X
} from 'lucide-react';

interface AdminSidebarProps {
  onClose?: () => void;
}

const AdminSidebar = ({ onClose }: AdminSidebarProps) => {
  const { logout, exportData } = useAdmin();

  const menuItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/gallery', icon: Image, label: 'Gallery' },
    { to: '/admin/reviews', icon: MessageSquare, label: 'Reviews' },
    { to: '/admin/contacts', icon: Mail, label: 'Contact Submissions' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/admin';
  };

  return (
    <div className="h-full flex flex-col text-white">
      {/* Header */}
      <div className="p-6 border-b border-white/20 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl font-bold">SCM Interiors</h2>
          <p className="text-xs text-white/70">Admin Panel</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-white hover:bg-white/10"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-white/20 text-white font-medium'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-white/20 space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start text-white border-white/20 hover:bg-white/10"
          onClick={exportData}
        >
          Export Data
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-white hover:bg-white/10"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
