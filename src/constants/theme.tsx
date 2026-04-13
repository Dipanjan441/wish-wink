
import React from 'react';
import { Gift, Heart, Sparkles, Star } from 'lucide-react';
import { ThemeConfig, ThemeId } from '@/types/index';

export const THEMES: Record<ThemeId, ThemeConfig> = {
    birthday: {
        name: 'Birthday',
        bgClass: 'bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100',
        cardClass: 'bg-white/80 backdrop-blur-md border-pink-200 shadow-pink-100',
        textClass: 'text-pink-600',
        fontClass: 'font-pacifico',
        accentColor: '#ec4899',
        icon: '🎂'
    },
    valentine: {
        name: 'Valentine',
        bgClass: 'bg-gradient-to-br from-red-50 via-rose-100 to-pink-50',
        cardClass: 'bg-white/90 backdrop-blur-md border-rose-200 shadow-rose-100',
        textClass: 'text-rose-600',
        fontClass: 'font-dancing',
        accentColor: '#f43f5e',
        icon: '❤️'
    },
    newyear: {
        name: 'New Year',
        bgClass: 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900',
        cardClass: 'bg-white/10 backdrop-blur-lg border-indigo-400 shadow-indigo-500/20',
        textClass: 'text-indigo-200',
        fontClass: 'font-playfair',
        accentColor: '#818cf8',
        icon: '🎆'
    },
    default: {
        name: 'Classic',
        bgClass: 'bg-gradient-to-br from-slate-50 to-slate-100',
        cardClass: 'bg-white border-slate-200 shadow-slate-200',
        textClass: 'text-slate-800',
        fontClass: 'font-sans',
        accentColor: '#64748b',
        icon: '✨'
    }
};

export const SUPABASE_SCHEMA_SQL = `
-- WishWink Database Schema
CREATE TABLE IF NOT EXISTS wishes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_name TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  message TEXT NOT NULL,
  theme_id TEXT NOT NULL DEFAULT 'default',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security (RLS) Example
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON wishes FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON wishes FOR INSERT WITH CHECK (true);
`;
