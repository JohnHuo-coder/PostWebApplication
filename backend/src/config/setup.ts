import { createClient } from '@supabase/supabase-js';
import dotenv from "dotenv";
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

console.log(process.env.SUPABASE_URL)
// normal client - for regular operations with RLS enabled
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// admin client - bypasses RLS
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
 auth: {
   autoRefreshToken: false,
   persistSession: false
 }
});
