import { createClient, SupabaseClient } from "@supabase/supabase-js";

export type Database = {
    public: {
        Tables: {
            posts: {
                Row: {
                    id: number;
                    title: string;
                    content: string;
                    created_at: string;
                    updated_at: string | null;
                    cover_image: string | null;
                };
                Insert: {
                    title: string;
                    content: string;
                    cover_image?: string | null;
                };
                Update: {
                    title?: string;
                    content?: string;
                    updated_at?: string;
                    cover_image?: string | null;
                };
            }
        }
    }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key environment variables');
}

const supabase: SupabaseClient<Database> = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;