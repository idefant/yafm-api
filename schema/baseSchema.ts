import { array, object, string } from 'yup';

import { base64Schema, hexSchema } from './commonSchema';

export const createBaseSchema = object().shape({
  iv: hexSchema.required(),
  cipher: base64Schema.required(),
  change_ids: array(string().uuid().required()).required(),
});
