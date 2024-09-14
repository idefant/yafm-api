import { object, date } from 'yup';

import { base64Schema, hexSchema } from './commonSchema';

export const getListCommitsSchema = object().shape({
  syncedAtFrom: date().required(),
});

export const createCommitSchema = object().shape({
  createdAt: date().required(),
  iv: hexSchema.required(),
  cipher: base64Schema.required(),
  hmac: hexSchema.required(),
  salt: hexSchema.required(),
});
