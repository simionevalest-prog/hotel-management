import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative min-h-screen pt-24 flex items-center px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-24 w-full">
        <section className="flex flex-col justify-center relative">
          {/* Accent Circle */}
          <div className="absolute -top-10 -left-10 w-32 h-32 border border-accent rounded-full -z-10 opacity-30" />
          
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif italic text-xl text-accent mb-6 block"
          >
            Karibu Zanzibar
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl md:text-[92px] font-serif leading-[0.9] font-normal mb-12 text-ink"
          >
            Fahari ya<br />Pwani ya<br />Afrika.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 border-y border-ink py-8 mb-12"
          >
            <div className="px-4 border-r border-line">
              <span className="editorial-label block mb-2">Tarehe ya Kufika</span>
              <span className="font-serif font-bold text-lg">12 Oktoba, 2024</span>
            </div>
            <div className="px-4 border-r border-line">
              <span className="editorial-label block mb-2">Wageni</span>
              <span className="font-serif font-bold text-lg">Watu Wazima 2</span>
            </div>
            <div className="px-4">
              <span className="editorial-label block mb-2">Aina ya Chumba</span>
              <span className="font-serif font-bold text-lg">Suite ya Kifalme</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link 
              to="/rooms" 
              className="btn-editorial-solid inline-block"
            >
              Weka Nafasi Sasa
            </Link>
          </motion.div>
        </section>

        <section className="relative hidden lg:block h-[600px]">
          <div className="w-full h-full bg-[#E0DDD5] rounded-t-[200px] overflow-hidden flex items-center justify-center relative">
            <img 
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2070" 
              className="w-full h-full object-cover opacity-80 mix-blend-multiply grayscale-[30%]"
              alt="Hotel View"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[12px] tracking-[0.4em] text-ink/30 rotate-[-90deg] uppercase font-medium">Taswira ya Hoteli</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
