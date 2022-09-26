import { array, object, string } from 'yup';

import { base64Schema, hexSchema } from './commonSchema';

export const createVersionSchema = object().shape({
  iv: hexSchema.required(),
  cipher: base64Schema.required(),
  changeIds: array(string().uuid().required()).required(),
});

export const getVersionByIdSchema = object().shape({
  versionId: string().uuid().required(),
});
