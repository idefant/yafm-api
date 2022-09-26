import { object } from 'yup';

import { base64Schema, hexSchema } from './commonSchema';

export const createChangeSchema = object().shape({
  cipher: base64Schema.required(),
  iv: hexSchema.required(),
});
