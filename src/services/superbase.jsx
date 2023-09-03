import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://gbwqndgefhxxjdvkqxxn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdid3FuZGdlZmh4eGpkdmtxeHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcxNjUxNjEsImV4cCI6MjAwMjc0MTE2MX0.flPbFz56GN6L2k1L1DPxNGuDDOUxXrobT3voGV30PdA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
