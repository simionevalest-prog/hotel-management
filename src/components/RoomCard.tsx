import { motion } from 'motion/react';
import { Star, Users, Maximize, ArrowRight } from 'lucide-react';
import { Room } from '../types';

interface RoomCardProps {
  room: Room;
  onBook: (room: Room) => void;
  key?: string | number;
}

export default function RoomCard({ room, onBook }: RoomCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white border border-line overflow-hidden transition-all duration-500 hover:shadow-xl"
    >
      <div className="relative h-80 overflow-hidden">
        <img 
          src={room.image_url} 
          alt={room.name}
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
        />
        <div className="absolute top-6 right-6 bg-bg px-5 py-2 border border-line">
          <span className="font-serif font-bold text-ink">${room.price_per_night}</span>
          <span className="text-[10px] uppercase tracking-widest text-ink/50 ml-1">/ usiku</span>
        </div>
      </div>

      <div className="p-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="editorial-label mb-2 block text-accent">{room.type}</span>
            <h3 className="text-3xl font-serif text-ink">{room.name}</h3>
          </div>
          <div className="flex items-center text-accent">
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-1 text-xs font-bold tracking-widest">4.9</span>
          </div>
        </div>

        <p className="text-ink/60 text-sm mb-8 leading-relaxed font-light">
          {room.description}
        </p>

        <div className="flex items-center space-x-8 mb-10 text-ink/40">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span className="text-[11px] uppercase tracking-widest">{room.capacity} Watu</span>
          </div>
          <div className="flex items-center space-x-2">
            <Maximize className="w-4 h-4" />
            <span className="text-[11px] uppercase tracking-widest">45m²</span>
          </div>
        </div>

        <button 
          onClick={() => onBook(room)}
          className="w-full btn-editorial-outline py-4 flex items-center justify-center space-x-3 group/btn"
        >
          <span className="font-bold">Weka Nafasi</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
