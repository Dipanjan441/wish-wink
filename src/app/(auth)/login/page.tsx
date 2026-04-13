
"use client";

import React, { use, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Loader2 } from 'lucide-react';
import BackButton from '@/components/BackButton';
import Logo from '@/components/Logo';
import TextInput from '@/components/input/TextInput';
import { supabaseClientForClient } from '@/lib/supabase/client';
import { ROUTES } from '@/constants/routes';
import { AUTH_ERRORS } from '@/constants/auth';
import { getErrorMessage } from '@/app/(auth)/utils';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get('redirect') || ROUTES.HOME;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabaseClientForClient.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.replace(redirectUrl);
        }
    };

    const errorCode = searchParams.get('error');
    const errorMessage = getErrorMessage(errorCode);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
                <BackButton />
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
                    <Logo />
                    <h1 className="text-3xl font-black text-center text-main mb-2">Welcome Back</h1>
                    <p className="text-center text-slate-500 mb-8 font-medium">Sign in to manage your winks</p>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}
                        {errorMessage && (
                            <div className="error-message">
                                {errorMessage}
                            </div>
                        )}

                        <TextInput
                            label='Email Address'
                            name='email'
                            placeholder='Email'
                            icon={Mail}
                            type='email'
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            autocomplete='email'
                        />

                        <TextInput
                            label='Password'
                            name='password'
                            placeholder='..........'
                            icon={Lock}
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            autocomplete='password'
                            tooltip='atleast one uppercase one lowercase letter one special charachter and one number is required'
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="primary-button"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-8 text-center pt-6 border-t border-slate-50">
                        <p className="text-slate-500 text-sm font-medium">
                            Don&apos;t have an account?{' '}
                            <Link href="/signup" className="link-text">
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}