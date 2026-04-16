import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!supabaseInstance) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(
        'Supabase URL au Anon Key hazijapatikana. ' +
        'Tafadhali nenda kwenye Settings > Secrets na uongeze VITE_SUPABASE_URL na VITE_SUPABASE_ANON_KEY.'
      );
    }
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
}

// Kwa ajili ya backward compatibility wakati tunahamia kwenye getSupabase()
export const supabase = {} as SupabaseClient; 
