import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ship, Menu, X, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { auth: { isAuthenticated }, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-primary-600 p-2 rounded-lg mr-3">
                <Ship className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">Yaaseen Shipping Lines</div>
                <div className="text-xs text-gray-600">United Oriental Steamship Co.</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link to="/" className="px-3 py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors">HOME</Link>
            <Link to="/about" className="px-3 py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors">ABOUT</Link>
            <Link to="/eservices" className="px-3 py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors">SERVICES</Link>
            <Link to="/contact" className="px-3 py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors">CONTACT</Link>
            <Link to="/tracking" className="px-3 py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors">TRACKING</Link>
          </div>

          {/* Login/Logout Button */}
          <div className="hidden lg:flex items-center">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <LogIn className="w-4 h-4 mr-2" />
                LOGOUT
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <LogIn className="w-4 h-4 mr-2" />
                LOGIN
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden bg-white border-t border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-6 space-y-4">
              <Link to="/" className="block text-gray-700 hover:text-primary-600 font-medium">HOME</Link>
              <Link to="/about" className="block text-gray-700 hover:text-primary-600 font-medium">ABOUT</Link>
              <Link to="/eservices" className="block text-gray-700 hover:text-primary-600 font-medium">SERVICES</Link>
              <Link to="/contact" className="block text-gray-700 hover:text-primary-600 font-medium">CONTACT</Link>
              <Link to="/tracking" className="block text-gray-700 hover:text-primary-600 font-medium">TRACKING</Link>

              <div className="pt-4 border-t border-gray-200 space-y-3">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" className="flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors w-full">
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors w-full"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors w-full"
                  >
                    LOGIN
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
