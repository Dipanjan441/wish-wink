
/**
 * Validates standard email format
 */
export const validateEmail = (value: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        return "Please enter a valid email address";
    }
    return null;
};

/**
 * Validates password strength (Min 8 chars, 1 number, 1 uppercase, 1 lowercase, 1 special character)
 */
export const validatePassword = (value: string): string | null => {
    if (value.length < 6) {
        return "Password must be at least 6 characters long";
    }
    if (!/[A-Z]/.test(value)) {
        return "Password must include at least one uppercase letter";
    }
    if (!/[0-9]/.test(value)) {
        return "Password must include at least one number";
    }
    if (!/[a-z]/.test(value)) {
        return "Password must include at least one lowercase letter";
    }
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharRegex.test(value)) {
        return "Include at least one special character (e.g., ! @ # $)";
    }
    return null;
};