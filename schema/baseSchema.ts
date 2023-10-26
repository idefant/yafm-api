import { object } from 'yup';

import { base64Schema, hexSchema } from './commonSchema';

export const createBaseSchema = object().shape({
  iv: hexSchema.required(),
  cipher: base64Schema.required(),
});
