export enum USER_ROLES {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export const AUTH_ERRORS = {
    LINK_EXPIRED: {
        code: 'link-expired',
        message: 'Your magic link has expired. Please request a new one.',
    }
}