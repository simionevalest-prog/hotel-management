import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSupabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'motion/react';
import { Calendar, MapPin, Clock, ChevronRight } from 'lucide-react';
import { Booking, Room } from '../types';
import { MOCK_ROOMS } from '../constants';

export default function Dashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<(Booking & { room: Room })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await getSupabase()
        .from('bookings')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const enrichedBookings = (data || []).map(b => ({
        ...b,
        room: MOCK_ROOMS.find(r => r.id === b.room_id) || MOCK_ROOMS[0]
      }));

      setBookings(enrichedBookings);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="pt-48 text-center editorial-label">Inapakia...</div>;

  return (
    <div className="min-h-screen pt-48 pb-24 px-6 max-w-6xl mx-auto">
      <header className="mb-20 border-b border-ink pb-10">
        <span className="editorial-label text-accent mb-4 block">Akaunti Yangu</span>
        <h1 className="text-5xl font-serif mb-4 text-ink">Booking Zangu</h1>
        <p className="editorial-label text-ink/40">Karibu tena, {user?.email}</p>
      </header>

      {bookings.length === 0 ? (
        <div className="bg-white border border-line p-20 text-center">
          <Calendar className="w-16 h-16 text-ink/10 mx-auto mb-8" />
          <h3 className="text-2xl font-serif mb-4">Huna booking yoyote kwa sasa</h3>
          <p className="editorial-label text-ink/40 mb-10">Anza safari yako kwa kuchagua chumba unachopenda.</p>
          <Link to="/rooms" className="btn-editorial-solid inline-block">Gundua Vyumba</Link>
        </div>
      ) : (
        <div className="grid gap-12">
          {bookings.map((booking) => (
            <motion.div 
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-line p-10 flex flex-col md:flex-row gap-12 items-center group hover:shadow-lg transition-all"
            >
              <div className="w-full md:w-64 h-40 overflow-hidden flex-shrink-0 grayscale-[30%] group-hover:grayscale-0 transition-all">
                <img src={booking.room.image_url} className="w-full h-full object-cover" alt="" />
              </div>

              <div className="flex-grow grid md:grid-cols-3 gap-10 w-full">
                <div>
                  <span className="editorial-label text-accent mb-2 block">Chumba</span>
                  <h3 className="text-2xl font-serif text-ink">{booking.room.name}</h3>
                  <div className="flex items-center text-ink/40 text-[11px] uppercase tracking-widest mt-3">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Main Wing, Floor 2</span>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="bg-bg p-4 border border-line">
                    <Calendar className="w-5 h-5 text-ink/40" />
                  </div>
                  <div>
                    <span className="editorial-label mb-2 block">Tarehe</span>
                    <span className="font-serif text-lg text-ink">{booking.check_in} — {booking.check_out}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-10">
                  <div className="text-right">
                    <span className="editorial-label mb-2 block">Hali</span>
                    <span className={`text-[11px] uppercase tracking-widest font-bold ${
                      booking.status === 'confirmed' ? 'text-green-600' : 
                      booking.status === 'pending' ? 'text-accent' : 'text-red-600'
                    }`}>
                      {booking.status === 'confirmed' ? 'Imethibitishwa' : 
                       booking.status === 'pending' ? 'Inasubiri' : 'Imeghairiwa'}
                    </span>
                  </div>
                  <button className="bg-bg hover:bg-ink hover:text-bg p-4 border border-line transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
