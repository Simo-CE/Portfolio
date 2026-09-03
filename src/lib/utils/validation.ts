import { FormData, FormErrors } from "@/lib/utils/types";

export const validateName = (name: string): string => {
    if (name.length < 3 || name.length > 50 || !/^[\p{L}\s.\-']+$/u.test(name) || name.trim() !== name || name.includes('@')) {
        return 'Invalid name format';
    }
    return '';
};

export const validateEmail = (email: string): string => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return 'Invalid email format';
    }
    return '';
};

export const validateContent = (content: string): string => {
    if (content.length < 10 || content.length > 1000) {
        return 'Content must be between 10 and 1000 characters';
    }
    const xssPatterns = [
        '<script>',
        'javascript:',
        '</script>',
        'vbscript:',
        'data:',
        'file:',
        'onerror='
    ];
    // validate against XSS attacks
    if (xssPatterns.some(pattern => content.includes(pattern))) {
        return 'Invalid content';
    }
    return '';
}

export const validateField = (fieldName: keyof FormData, value: string): string => {
    switch (fieldName) {
        case 'name':
            return validateName(value);
        case 'email':
            return validateEmail(value);
        case 'content':
            return validateContent(value);
        default:
            return '';
    }
}

export const validateForm = (formData: FormData): FormErrors => {
    const errors: FormErrors = {};
    for (const [fieldName, value] of Object.entries(formData)) {
        if (fieldName === 'honeypot') continue;
        const error = validateField(fieldName as keyof FormData, value);
        if (error) {
            errors[fieldName as keyof FormErrors] = error;
        }
    }
    return errors;
}