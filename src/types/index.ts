export type ThemeId = 'birthday' | 'valentine' | 'newyear' | 'default';

export interface ThemeConfig {
    name: string;
    icon: string;
    bgClass: string;
    cardClass: string;
    textClass: string;
    fontClass: string;
    accentColor: string;
}

export interface Wish {
    id: string;
    sender_name: string;
    recipient_name: string;
    message: string;
    theme_id: ThemeId;
    created_at: string;
}