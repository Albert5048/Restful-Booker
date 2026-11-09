import Ajv from 'ajv';
import addFormats from 'ajv-formats';

export const ajv = new Ajv({
  allErrors: true,
  strict: true,
});

addFormats(ajv);
