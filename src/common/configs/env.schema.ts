import * as Joi from 'joi';

export default Joi.object({
  CLIENT_URL: Joi.string().uri().required(),

  API_PORT: Joi.number().port().required(),
  API_HOST: Joi.string().hostname().required(),
  API_PREFIX: Joi.string().default('api'),

  DB_PORT: Joi.number().port().required(),
  DB_HOST: Joi.string().hostname().required(),
  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  
  DATABASE_URL: Joi.string().uri().required(),

  ACCESS_TOKEN: Joi.string().required(),
  ACCESS_TTL: Joi.string()
    .pattern(/^\d+[smhd]$/)
    .required(),

  REFRESH_TOKEN: Joi.string().required(),
  REFRESH_TTL: Joi.string()
    .pattern(/^\d+[smhd]$/)
    .required(),

  NODE_ENV: Joi.string().valid('development', 'production').required(),
});
