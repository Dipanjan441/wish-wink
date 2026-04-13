"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";
import { supabaseClientForClient } from "@/lib/supabase/client";
import { ROUTES } from "@/constants/routes";
import { AUTH_ERRORS } from "@/constants/auth";

export default function WelcomePage() {
    const router = useRouter();
    const [status, setStatus] = useState("verifying"); // verifying | success

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabaseClientForClient.auth.getSession();

            if (session) {
                setStatus("success");
                // Wait 2 seconds so they see the success state, then move to profile
                setTimeout(() => {
                    router.push(ROUTES.PROFILE);
                }, 2500);
            } else {
                // If no session, they might have clicked an expired link
                router.push(`${ROUTES.LOGIN}?error=${AUTH_ERRORS.LINK_EXPIRED.code}`); // Redirect to login with error message
            }
        };

        checkSession();
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
                {status === "verifying" ? (
                    <>
                        <Loader2 className="w-12 h-12 text-secondary animate-spin mx-auto" />
                        <h1 className="text-xl font-bold text-slate-700">Finalizing your account...</h1>
                    </>
                ) : (
                    <>
                        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-200">
                            <CheckCircle2 className="w-10 h-10 text-green-600" />
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-3xl font-black text-slate-900">Welcome to JobBuddy!</h1>
                            <p className="text-slate-500">Your email has been verified. Redirecting you now...</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}