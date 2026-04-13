import { SUPABASE_API_KEY, SUPABASE_URL } from "@/config/appConfig";
import {createBrowserClient} from "@supabase/ssr";

export const supabaseClientForClient = createBrowserClient(SUPABASE_URL, SUPABASE_API_KEY);