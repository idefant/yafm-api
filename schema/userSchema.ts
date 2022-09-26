import { object, string } from 'yup';

import { usernameSchema, passwordSchema, hexSchema } from './commonSchema';

export const signupUserSchema = object().shape({
  username: usernameSchema.required(),
  password: passwordSchema.required(),
  salt: hexSchema.required(),
});

export const loginUserSchema = object().shape({
  username: usernameSchema.required(),
  password: passwordSchema.required(),
});

export const changePasswordSchema = object().shape({
  username: usernameSchema.required(),
  password: passwordSchema.required(),
  new_password: passwordSchema.required(),
});

export const refreshTokenSchema = object().shape({
  refresh_token: string().uuid().required(),
});
