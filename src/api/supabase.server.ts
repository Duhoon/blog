import "server-only";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rpghzgqushnkznqrdbeq.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseKey) {
  throw new Error("SUPABASE_KEY is required to read blog posts");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
