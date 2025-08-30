import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import kochiMetroLogo from "@/assets/kochi-metro-logo.png";

interface NavbarProps {
  onLoginClick?: () => void;
  onLogout?: () => void;
  isLoggedIn?: boolean;
  activeTab?: string;
  onTabClick?: (tab: string) => void;
}

const Navbar = ({ onLoginClick, onLogout, isLoggedIn = false, activeTab, onTabClick }: NavbarProps) => {
  const tabs = ['All', 'Uploaded', 'Verified', 'Marked'];

  if (isLoggedIn) {
    return (
      <nav className="w-full bg-background border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-1 flex items-center gap-3">
              <img 
                src={kochiMetroLogo} 
                alt="Kochi Metro Rail Limited Logo" 
                className="h-8 w-auto"
              />
              <h1 className="text-xl font-bold text-foreground">KOCHI METRO</h1>
            </div>
            
            <div className="flex-1 flex justify-center">
              <div className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => onTabClick?.(tab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-fast ${
                      activeTab === tab
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex-1 flex justify-end items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search documents..."
                  className="pl-10 w-64 h-9"
                />
              </div>
              <Button 
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                +
              </Button>
              <Button 
                variant="outline"
                size="sm"
                onClick={onLogout}
                className="text-muted-foreground hover:text-foreground"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-full bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-3">
            <img 
              src={kochiMetroLogo} 
              alt="Kochi Metro Rail Limited Logo" 
              className="h-8 w-auto"
            />
            <h1 className="text-xl font-bold text-foreground">KOCHI METRO</h1>
          </div>
          <div className="flex items-center">
            <Button onClick={onLoginClick} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Login
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;