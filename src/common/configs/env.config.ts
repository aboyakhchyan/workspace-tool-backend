export default () => ({
  api: {
    port: parseInt(process.env.API_PORT ?? '3550', 10),
    host: process.env.API_HOST ?? 'localhost',
    prefix: process.env.API_PREFIX,
  },
  db: {
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER ?? 'postgres',
  },
  client: {
    url: process.env.CLIENT_URL ?? 'http://localhost:6550',
  },
  jwt: {
    access: process.env.ACCESS_TOKEN,
    accessTtl: process.env.ACCESS_TTL,
    refresh: process.env.REFRESH_TOKEN,
    refreshTtl: process.env.REFRESH_TTL,
  },
  nodeEnv: process.env.NODE_ENV ?? 'development',
});
