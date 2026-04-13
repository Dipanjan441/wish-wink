import {ROUTES} from "@/constants/routes";

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const SUPABASE_API_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "";
export const APP_BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL || "";

//urls
export const APP_URL = {
    WELCOME: `${APP_BASE_URL}/${ROUTES.WELCOME}`
}