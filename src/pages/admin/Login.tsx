import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useAdmin } from '@/contexts/AdminContext';
import { toast } from 'sonner';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (login(username, password)) {
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-card shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-4">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-accent mb-2">
            Admin Login
          </h1>
          <p className="text-muted-foreground">Sri Chamundeshwari Interiors</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="mt-1"
            />
          </div>

          <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
            Login
          </Button>
        </form>

        <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            Default credentials: admin / scminteriors2025
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;
