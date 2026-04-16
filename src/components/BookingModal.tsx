import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, CreditCard, CheckCircle2 } from 'lucide-react';
import { Room } from '../types';
import { getSupabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

interface BookingModalProps {
  room: Room | null;
  onClose: () => void;
}

export default function BookingModal({ room, onClose }: BookingModalProps) {
  const { user } = useAuth();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Tafadhali ingia kwanza ili kuweka booking.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await getSupabase().from('bookings').insert([
        {
          user_id: user.id,
          room_id: room?.id,
          check_in: checkIn,
          check_out: checkOut,
          status: 'pending',
          total_price: room?.price_per_night || 0 
        }
      ]);

      if (error) throw error;
      setSuccess(true);
      setTimeout(onClose, 3000);
    } catch (err: any) {
      alert('Kuna tatizo: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {room && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="relative w-full max-w-xl bg-bg border border-line shadow-2xl overflow-hidden"
          >
            {success ? (
              <div className="p-16 text-center">
                <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-4xl font-serif mb-4 text-ink">Hongera!</h3>
                <p className="editorial-label text-ink/60">Booking yako imepokelewa. Tutakuwasiliana hivi punde.</p>
              </div>
            ) : (
              <>
                <div className="relative h-64">
                  <img src={room.image_url} className="w-full h-full object-cover grayscale-[20%]" alt="" />
                  <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 bg-bg p-3 border border-line hover:bg-ink hover:text-bg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-bg to-transparent">
                    <span className="editorial-label text-accent mb-2 block">{room.type}</span>
                    <h3 className="text-4xl font-serif text-ink">{room.name}</h3>
                  </div>
                </div>

                <form onSubmit={handleBooking} className="p-10 space-y-10">
                  <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="editorial-label ml-1">Tarehe ya Kufika</label>
                      <div className="relative">
                        <Calendar className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                        <input 
                          type="date" 
                          required
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="w-full bg-transparent border-b border-line py-3 pl-8 pr-2 focus:border-ink outline-none text-sm font-serif"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="editorial-label ml-1">Tarehe ya Kuondoka</label>
                      <div className="relative">
                        <Calendar className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                        <input 
                          type="date" 
                          required
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full bg-transparent border-b border-line py-3 pl-8 pr-2 focus:border-ink outline-none text-sm font-serif"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-y border-line py-6 flex justify-between items-center">
                    <div>
                      <span className="editorial-label block mb-1">Gharama kwa usiku</span>
                      <span className="font-serif text-2xl font-bold">${room.price_per_night}</span>
                    </div>
                    <div className="text-right">
                      <span className="editorial-label block mb-1">Jumla Inakadiriwa</span>
                      <span className="font-serif text-2xl font-bold text-accent">${room.price_per_night}</span>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full btn-editorial-solid py-5 flex items-center justify-center space-x-4 disabled:opacity-50"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>{loading ? 'Inatuma...' : 'Thibitisha Booking'}</span>
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
