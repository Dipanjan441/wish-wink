import { AUTH_ERRORS } from "@/constants/auth";

export const getErrorMessage = (errorCode: string | null) => {
    if (!errorCode) return null;

    return Object.values(AUTH_ERRORS).find(error => error.code === errorCode)?.message || null;
}