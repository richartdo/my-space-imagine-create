
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Navigation = () => {
  const location = useLocation();
  const { user, signOut, loading } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  if (loading) {
    return (
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg"></div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Design Me
              </span>
            </Link>
            <div className="animate-pulse h-8 w-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg"></div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Design Me
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-purple-600 ${
                isActive('/') ? 'text-purple-600' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/proposals" 
              className={`text-sm font-medium transition-colors hover:text-purple-600 ${
                isActive('/proposals') ? 'text-purple-600' : 'text-gray-700'
              }`}
            >
              Explore Ideas
            </Link>
            {user && (
              <Link 
                to="/dashboard" 
                className={`text-sm font-medium transition-colors hover:text-purple-600 ${
                  isActive('/dashboard') ? 'text-purple-600' : 'text-gray-700'
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600 hidden sm:block">
                  Welcome, {user.user_metadata?.full_name || user.email}
                </span>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
