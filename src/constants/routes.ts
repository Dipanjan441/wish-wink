export const ROUTES = {
    //public routes
    HOME: '/',

    //auth callback routes
    WELCOME: '/welcome',

    //auth routes
    LOGIN: '/login',
    SIGNUP: '/signup',
    FORGOT_PASSWORD: '/forget-password',

    //protected routes
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',

    //admin routes
    ADMIN: '/admin',
} as const;

//routes grouped by access level
export const ROUTE_GROUPS = {
    PUBLIC: [ROUTES.HOME, ROUTES.WELCOME],

    AUTH: [
        ROUTES.LOGIN,
        ROUTES.SIGNUP,
        ROUTES.FORGOT_PASSWORD,
    ],

    PROTECTED: [
        ROUTES.DASHBOARD,
        ROUTES.PROFILE,
    ],

    ADMIN: [ROUTES.ADMIN],
};