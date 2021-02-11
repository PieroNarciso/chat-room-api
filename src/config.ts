export default {
  DB_URI: process.env.DB_URI as string,
  NODE_ENV: process.env.NODE_ENV,
  SECRET_KEY: process.env.SECRET_KEY || 'secret',
  SESSION_NAME: process.env.SESSION_NAME || 'suid',
  SALT_ROUNDS: 12,
  API_VERSION: '/api/v1',
  CORS_ORIGIN_WHITELIST: process.env.CORS_ORIGIN_WHITELIST?.split(',') as string[],
  REDIS_URL: process.env.REDIS_URL as string,
};
