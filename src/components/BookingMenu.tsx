import { motion } from 'motion/react';
import { Calendar, Users, Search, MapPin, Tag } from 'lucide-react';

export default function BookingMenu({ onFilterChange }: { onFilterChange: (val: string) => void }) {
  return (
    <div className="bg-white border border-line shadow-2xl p-8 max-w-6xl mx-auto -mt-16 relative z-30 hidden lg:block">
      <div className="grid grid-cols-5 gap-8 items-end">
        {/* ... existing fields ... */}
        <div className="space-y-3">
          <label className="editorial-label flex items-center">
            <MapPin className="w-3 h-3 mr-2" />
            Eneo
          </label>
          <select className="w-full bg-transparent border-b border-line py-2 outline-none font-serif text-lg appearance-none cursor-pointer">
            <option>Zanzibar North</option>
            <option>Stone Town</option>
            <option>Pwani Mchangani</option>
          </select>
        </div>

        <div className="space-y-3">
          <label className="editorial-label flex items-center">
            <Calendar className="w-3 h-3 mr-2" />
            Tarehe
          </label>
          <input 
            type="text" 
            placeholder="Chagua Tarehe" 
            className="w-full bg-transparent border-b border-line py-2 outline-none font-serif text-lg placeholder:text-ink/20"
          />
        </div>

        <div className="space-y-3">
          <label className="editorial-label flex items-center">
            <Users className="w-3 h-3 mr-2" />
            Wageni
          </label>
          <select className="w-full bg-transparent border-b border-line py-2 outline-none font-serif text-lg appearance-none cursor-pointer">
            <option>1 Mgeni</option>
            <option>2 Wageni</option>
            <option>3+ Wageni</option>
          </select>
        </div>

        <div className="space-y-3">
          <label className="editorial-label flex items-center">
            <Tag className="w-3 h-3 mr-2" />
            Bei (kwa usiku)
          </label>
          <select 
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full bg-transparent border-b border-line py-2 outline-none font-serif text-lg appearance-none cursor-pointer"
          >
            <option value="Zote">Zote</option>
            <option value="Chini ya $200">Chini ya $200</option>
            <option value="$200 - $500">$200 - $500</option>
            <option value="Zaidi ya $500">Zaidi ya $500</option>
          </select>
        </div>

        <button className="btn-editorial-solid w-full flex items-center justify-center space-x-3 group h-[52px]">
          <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Tafuta</span>
        </button>
      </div>
    </div>
  );
}
