import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAdmin } from "@/contexts/AdminContext";
import { toast } from "sonner";
import { Lock } from "lucide-react";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (login(username, password)) {
      toast.success("Login successful!");
      navigate("/admin/dashboard");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-secondary">
      <Card className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl border-0">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-accent shadow-lg">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold mb-2 text-foreground">
            Sri Chamundeshwari Interiors
          </h1>
          <p className="text-muted-foreground text-sm tracking-wider">
            ADMIN LOGIN
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="username" className="text-foreground font-medium">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              className="mt-2 h-12 bg-secondary border-0 focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-foreground font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="mt-2 h-12 bg-secondary border-0 focus:ring-2 focus:ring-accent"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-accent hover:bg-accent/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;
