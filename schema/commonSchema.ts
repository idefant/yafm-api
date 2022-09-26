import { string } from 'yup';

export const usernameSchema = string().matches(/^[a-z][a-z0-9]+$/i).min(4).max(32);
export const passwordSchema = string().min(6).max(255);
export const hexSchema = string().matches(/^[0-9a-f]*$/i);
export const base64Schema = string().matches(/^[0-9a-z=/]*$/);
