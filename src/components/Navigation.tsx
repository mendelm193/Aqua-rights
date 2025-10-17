import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Droplet, LayoutDashboard, Store, Award, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signOut } from "@/lib/auth";
import { toast } from "sonner";

interface NavigationProps {
  user: User;
}

const Navigation = ({ user }: NavigationProps) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error("Failed to sign out");
    } else {
      toast.success("Signed out successfully");
      navigate("/auth");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="gradient-ocean p-2 rounded-lg">
              <Droplet className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">AquaRights</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#dashboard" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </a>
            <a href="#marketplace" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <Store className="w-4 h-4" />
              Marketplace
            </a>
            <a href="#rewards" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <Award className="w-4 h-4" />
              Rewards
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-sm text-muted-foreground">
              {user.email}
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
