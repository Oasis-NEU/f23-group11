import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://iavgqyjplsrytimtmldp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhdmdxeWpwbHNyeXRpbXRtbGRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczODY0NTAsImV4cCI6MjAxMjk2MjQ1MH0.Q20JwzuknYBeeynW_wBrGPUHtC6QR4FSEuwQEJsZFKU";

export const supabase = createClient(supabaseURL ,supabaseKey);