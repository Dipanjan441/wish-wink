"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Loader2, User } from 'lucide-react';
import BackButton from '@/components/BackButton';
import Logo from '@/components/Logo';
import TextInput from '@/components/input/TextInput';
import { validateEmail, validatePassword } from '@/utils/validations';
import { PASSWORD_TOOLTIP } from '@/constants/tooltip';
import { APP_URL, SUPABASE_API_KEY } from '@/config/appConfig';
import { supabaseClientForClient } from '@/lib/supabase/client';
import { ROUTES } from '@/constants/routes';

export default function SignupPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleSignup = async (e: React.FormEvent) => {
        console.log(SUPABASE_API_KEY)
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error, data } = await supabaseClientForClient.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    user_name: formData.name,
                },
                emailRedirectTo: APP_URL.WELCOME
            },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            if (data.session) {
                router.push(ROUTES.WELCOME);
            } else {
                setError("Check your email for a magic link! ✨");
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
                <BackButton />

                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
                    <Logo />
                    <h1 className="text-3xl font-black text-center text-primary mb-2">Create Account</h1>
                    <p className="text-center text-slate-500 mb-8 font-medium">Start sending smiles today</p>

                    <form onSubmit={handleSignup} className="space-y-6">
                        {error && (
                            <div className={`p-4 ${error.includes('email') ? 'bg-indigo-50 text-indigo-600' : 'bg-pink-50 text-pink-600'} border border-opacity-20 text-sm font-bold rounded-2xl animate-in fade-in`}>
                                {error}
                            </div>
                        )}

                        <TextInput
                            label='Name'
                            name='userName'
                            placeholder='Name'
                            icon={User}
                            isRequired={true}
                            value={formData.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                            autocomplete='userName'
                        />

                        <TextInput
                            label='Email Address'
                            name='email'
                            placeholder='Email'
                            icon={Mail}
                            isRequired={true}
                            value={formData.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                            autocomplete='email'
                            validate={validateEmail}
                        />

                        <TextInput
                            label='Password'
                            name='password'
                            placeholder='..........'
                            icon={Lock}
                            value={formData.password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
                            autocomplete='password'
                            isPasswordIcon={true}
                            validate={validatePassword}
                            isRequired={true}
                            tooltip={PASSWORD_TOOLTIP}
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="primary-button"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Get Started'}
                        </button>
                    </form>

                    <div className="mt-8 text-center pt-6 border-t border-slate-50">
                        <p className="text-slate-500 text-sm font-medium">
                            Already a member?{' '}
                            <Link href={ROUTES.LOGIN} className="link-text">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}