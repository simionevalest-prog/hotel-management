import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BookingMenu from './components/BookingMenu';
import RoomList from './components/RoomList';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import { Hotel, Instagram, Facebook, Twitter } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-bg border-t border-line py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="editorial-label text-ink/40">
          © 2024 Lulu ya Bahari — Zanzibar, Tanzania
        </div>
        
        <div className="flex items-center space-x-10">
          <a href="#" className="editorial-label hover:text-accent transition-colors">Instagram</a>
          <a href="#" className="editorial-label hover:text-accent transition-colors">Facebook</a>
          <a href="#" className="editorial-label hover:text-accent transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [priceFilter, setPriceFilter] = useState('Zote');

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <BookingMenu onFilterChange={setPriceFilter} />
                <RoomList priceFilter={priceFilter} />
              </>
            } />
            <Route path="/rooms" element={<RoomList priceFilter={priceFilter} />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
