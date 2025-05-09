
import React from 'react';
import { Bell, User, Home, HelpCircle, Book, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-blood-blue font-bold text-2xl">Blood-DX</Link>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full ml-2">
            Beta
          </span>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <Link 
            to="/" 
            className={`font-medium ${isActiveRoute('/') ? 'text-blood-blue' : 'text-gray-600 hover:text-blood-blue'} flex items-center gap-1`}
          >
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <Link 
            to="/history" 
            className={`font-medium ${isActiveRoute('/history') ? 'text-blood-blue' : 'text-gray-600 hover:text-blood-blue'} flex items-center gap-1`}
          >
            <Calendar className="h-4 w-4" />
            <span>History</span>
          </Link>
          <Link 
            to="/about" 
            className={`font-medium ${isActiveRoute('/about') ? 'text-blood-blue' : 'text-gray-600 hover:text-blood-blue'} flex items-center gap-1`}
          >
            <Book className="h-4 w-4" />
            <span>About</span>
          </Link>
          <Link 
            to="/help" 
            className={`font-medium ${isActiveRoute('/help') ? 'text-blood-blue' : 'text-gray-600 hover:text-blood-blue'} flex items-center gap-1`}
          >
            <HelpCircle className="h-4 w-4" />
            <span>Help</span>
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
