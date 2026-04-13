
"use client";

import React from 'react';
import { ThemeId } from '@/types/index';
import { THEMES } from '@/constants/theme';

export default function ThemeWrapper({ themeId, children }: { themeId: ThemeId, children: React.ReactNode }) {
    const theme = THEMES[themeId] || THEMES.default;

    const renderParticles = () => {
        const emojis = { birthday: '🎈', valentine: '❤️', newyear: '🎆', default: '✨' };
        return Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="absolute animate-pulse opacity-10 pointer-events-none"
                style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    fontSize: `${Math.random() * 20 + 10}px`,
                    animationDelay: `${Math.random() * 5}s`,
                }}>
                {emojis[themeId] || '✨'}
            </div>
        ));
    };

    return (
        <div className={`min-h-screen w-full relative overflow-hidden transition-all duration-1000 ${theme.bgClass}`}>
            <div className="absolute inset-0">{renderParticles()}</div>
            <div className="relative z-10 flex flex-col items-center justify-center p-6 min-h-screen">
                {children}
            </div>
        </div>
    );
}