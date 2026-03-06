import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "YOUR_SUPABASE_URL";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY";

export const supabase = createClient(supabaseUrl, supabaseKey);

// Cloudinary configuration will be handled directly in services.js using env variables

export const app = null;
export const storage = null;
export const auth = null;
export const db = null;
export default supabase;
