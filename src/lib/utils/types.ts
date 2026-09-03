export interface FormErrors {
    name?: string;
    email?: string;
    content?: string;
    general?: string;
}

export interface FormData {
    name: string;
    email: string;
    content: string;
    honeypot?: string;
}