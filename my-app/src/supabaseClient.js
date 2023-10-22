import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://iavgqyjplsrytimtmldp.supabase.co";//process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhdmdxeWpwbHNyeXRpbXRtbGRwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NzM4NjQ1MCwiZXhwIjoyMDEyOTYyNDUwfQ.7MFoLNoyettK3T1AFL7bdbsSpioFY_TTfNhJY2YEvow";//process.env.REACT_APP_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
