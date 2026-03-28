import React, { useState } from 'react';
import { GraduationCap, Scale, Menu, X } from 'lucide-react';

interface NavbarProps {
  compareCount: number;
  onOpenCompare: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ compareCount, onOpenCompare }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-gray-900 p-1.5 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter text-gray-900">
              Scholar<span className="text-blue-600">Hack</span>
            </span>
          </div>
          
          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 text-sm font-bold text-gray-500">
            <a href="#" className="hover:text-gray-900 transition-colors">Scholarships</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Tech Majors</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Resources</a>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <button 
              onClick={onOpenCompare}
              className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors"
            >
              <Scale className="w-6 h-6" />
              {compareCount > 0 && (
                <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </button>
            <button className="hidden sm:block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
              Get Alerts
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-500 hover:text-gray-900 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 py-4 px-4 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col space-y-4 text-sm font-bold text-gray-500">
            <a href="#" className="hover:text-gray-900 transition-colors py-2 border-b border-gray-50">Scholarships</a>
            <a href="#" className="hover:text-gray-900 transition-colors py-2 border-b border-gray-50">Tech Majors</a>
            <a href="#" className="hover:text-gray-900 transition-colors py-2 border-b border-gray-50">Resources</a>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-blue-600/20">
            Get Alerts
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
