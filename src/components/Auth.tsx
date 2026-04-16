import React, { useState } from 'react';
import { getSupabase } from '../lib/supabase';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = getSupabase();
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: { full_name: fullName }
          }
        });
        if (error) throw error;
        alert('Tafadhali kagua barua pepe yako ili kuthibitisha akaunti.');
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-48 pb-24 px-6 flex items-center justify-center bg-bg">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-12 border border-line shadow-sm relative"
      >
        {/* Decorative Circle */}
        <div className="absolute -top-6 -left-6 w-12 h-12 border border-accent rounded-full -z-10" />

        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif mb-3 text-ink">{isLogin ? 'Ingia kwenye Akaunti' : 'Jisajili Sasa'}</h2>
          <p className="editorial-label">
            {isLogin ? 'Karibu tena Lulu ya Bahari' : 'Anza safari yako ya kifahari'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-4 mb-8 text-xs tracking-wider uppercase">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-8">
          {!isLogin && (
            <div className="space-y-3">
              <label className="editorial-label ml-1">Jina Kamili</label>
              <input 
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border-b border-line py-3 px-1 focus:border-ink outline-none transition-all font-serif text-lg bg-transparent"
                placeholder="John Doe"
              />
            </div>
          )}

          <div className="space-y-3">
            <label className="editorial-label ml-1">Barua Pepe</label>
            <input 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-line py-3 px-1 focus:border-ink outline-none transition-all font-serif text-lg bg-transparent"
              placeholder="email@mfano.com"
            />
          </div>

          <div className="space-y-3">
            <label className="editorial-label ml-1">Nenosiri</label>
            <input 
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-line py-3 px-1 focus:border-ink outline-none transition-all font-serif text-lg bg-transparent"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full btn-editorial-solid py-5 flex items-center justify-center space-x-3 disabled:opacity-50"
          >
            <span>{loading ? 'Inapakia...' : (isLogin ? 'Ingia' : 'Jisajili')}</span>
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>

        <div className="mt-12 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="editorial-label hover:text-accent transition-colors underline underline-offset-8"
          >
            {isLogin ? 'Huna akaunti? Jisajili hapa' : 'Tayari una akaunti? Ingia hapa'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
