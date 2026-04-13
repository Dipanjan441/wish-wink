
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Gift, Sparkles, Send, User, Wand2, Loader2 } from 'lucide-react';
import { THEMES } from '@/constants/theme';
import { ThemeId } from '@/types/index';
import { SUPABASE_API_KEY, SUPABASE_URL } from '@/config/appConfig';
import { supabaseClientForClient } from '@/lib/supabase/client';

export default function HomePage() {
  console.log(SUPABASE_API_KEY, SUPABASE_URL)
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    sender_name: '',
    recipient_name: '',
    message: '',
    theme_id: 'birthday' as ThemeId
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    // Using local storage mock if Supabase is not configured
    const { data, error } = await supabaseClientForClient.from('wishes').insert([formData]).select();

    if (!error && data) {
      router.push(`/wish/${data[0].id}`);
    } else {
      // Fallback for demo if Supabase keys aren't real
      const mockId = Math.random().toString(36).substring(7);
      const stored = JSON.parse(localStorage.getItem('wishes') || '{}');
      stored[mockId] = formData;
      localStorage.setItem('wishes', JSON.stringify(stored));
      router.push(`/wish/${mockId}`);
    }
  };

  const handleMagicWrite = async () => {
    if (!formData.recipient_name) return alert("Enter a name first! ✨");
    setIsGenerating(true);
    // const msg = await generateWishSuggestion(formData.recipient_name, formData.theme_id);
    // setFormData({ ...formData, message: msg });
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6 pt-12">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Gift className="w-12 h-12 text-indigo-600" />
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">WishWink</h1>

        <form onSubmit={handleCreate} className="text-left space-y-5 bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">To</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input required placeholder="Recipient Name" className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.recipient_name} onChange={e => setFormData({ ...formData, recipient_name: e.target.value })} />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Theme</label>
            <div className="grid grid-cols-3 gap-2">
              {(['birthday', 'valentine', 'newyear'] as ThemeId[]).map(t => (
                <button key={t} type="button" onClick={() => setFormData({ ...formData, theme_id: t })}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border-2 ${formData.theme_id === t ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-50 bg-slate-50 text-slate-400'}`}>
                  {THEMES[t].icon}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Message</label>
              <button type="button" onClick={handleMagicWrite} disabled={isGenerating} className="text-[10px] font-bold text-indigo-600 flex items-center gap-1 hover:opacity-70 disabled:opacity-50">
                {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />} Magic Write
              </button>
            </div>
            <textarea required placeholder="Write a wink..." className="w-full p-4 bg-slate-50 rounded-xl focus:ring-2 focus:ring-indigo-500 h-24 resize-none outline-none"
              value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">From</label>
            <input required placeholder="Your Name" className="w-full px-4 py-3 bg-slate-50 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.sender_name} onChange={e => setFormData({ ...formData, sender_name: e.target.value })} />
          </div>

          <button type="submit" disabled={isCreating} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-2">
            {isCreating ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Send Wink</>}
          </button>
        </form>
      </div>
      {/* <WishAssistant context="Creating a new wish wink." /> */}
    </div>
  );
}
