import { Link } from 'react-router-dom';
import { Hotel, User, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { getSupabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await getSupabase().auth.signOut();
  };

  return (
    <nav className="fixed w-full z-50 bg-bg/90 backdrop-blur-sm border-b border-line">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between h-24 items-baseline pt-8 pb-6">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-bold tracking-tight uppercase text-ink">Lulu ya Bahari</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            <Link to="/rooms" className="text-[13px] uppercase tracking-widest font-medium hover:text-accent transition-colors">Vyumba</Link>
            <div className="relative group">
              <button className="text-[13px] uppercase tracking-widest font-medium hover:text-accent transition-colors flex items-center">
                Huduma <ChevronDown className="ml-1 w-3 h-3" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-line shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link to="/" className="block px-6 py-4 text-[11px] uppercase tracking-widest hover:bg-bg transition-colors">Migahawa</Link>
                <Link to="/" className="block px-6 py-4 text-[11px] uppercase tracking-widest hover:bg-bg transition-colors border-t border-line">Spa & Wellness</Link>
                <Link to="/" className="block px-6 py-4 text-[11px] uppercase tracking-widest hover:bg-bg transition-colors border-t border-line">Matukio</Link>
              </div>
            </div>
            {user ? (
              <div className="flex items-center space-x-8">
                <Link to="/dashboard" className="text-[13px] uppercase tracking-widest font-medium hover:text-accent transition-colors">Booking Zangu</Link>
                <button 
                  onClick={handleLogout}
                  className="btn-editorial-outline"
                >
                  Toka
                </button>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="btn-editorial-outline"
              >
                Ingia
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-ink">
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-bg border-b border-line px-6 py-8 space-y-6">
          <Link to="/rooms" className="block text-sm uppercase tracking-widest" onClick={() => setIsOpen(false)}>Vyumba</Link>
          <Link to="/dashboard" className="block text-sm uppercase tracking-widest" onClick={() => setIsOpen(false)}>Booking</Link>
          {user ? (
            <button onClick={handleLogout} className="block text-sm uppercase tracking-widest text-accent">Toka</button>
          ) : (
            <Link to="/auth" className="block text-sm uppercase tracking-widest text-accent" onClick={() => setIsOpen(false)}>Ingia</Link>
          )}
        </div>
      )}
    </nav>
  );
}
