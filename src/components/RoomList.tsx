import { useState } from 'react';
import { MOCK_ROOMS } from '../constants';
import RoomCard from './RoomCard';
import BookingModal from './BookingModal';
import { Room } from '../types';

export default function RoomList({ priceFilter = 'Zote' }: { priceFilter?: string }) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const filteredRooms = MOCK_ROOMS.filter(room => {
    if (priceFilter === 'Zote') return true;
    if (priceFilter === 'Chini ya $200') return room.price_per_night < 200;
    if (priceFilter === '$200 - $500') return room.price_per_night >= 200 && room.price_per_night <= 500;
    if (priceFilter === 'Zaidi ya $500') return room.price_per_night > 500;
    return true;
  });

  return (
    <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="mb-24 relative">
        <div className="absolute -top-12 -left-6 w-24 h-24 border border-accent rounded-full -z-10 opacity-20" />
        <span className="editorial-label mb-4 block text-accent">Vyumba Vyetu</span>
        <h2 className="text-5xl md:text-7xl font-serif text-ink leading-tight">Chagua <span className="italic">Makazi</span> Yako</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <RoomCard 
              key={room.id} 
              room={room} 
              onBook={(r) => setSelectedRoom(r)} 
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="font-serif text-2xl text-ink/40 italic">Samahani, hakuna vyumba vinavyolingana na bei uliyochagua.</p>
          </div>
        )}
      </div>

      <BookingModal 
        room={selectedRoom} 
        onClose={() => setSelectedRoom(null)} 
      />
    </section>
  );
}
