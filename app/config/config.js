const appName = 'baseapi';
const config = {
  appName,
  webserver: {
    port: process.env.PORT || '8080',
    loggingEnabled: false,
  },
  logging: {
    redact: [
      'password',
      'confirmPassword',
      'passwordConfirmation',
      'token',
      'apikey',
      'apiKey',
    ],
  },
  redis: {
    host: process.env.REDIS_PORT_6379_TCP_ADDR || process.env.REDIS_HOST,
    port: process.env.REDIS_PORT_6379_TCP_PORT || process.env.REDIS_PORT || 6379,
    database: process.env.REDIS_DATABASE || 0,
  },
};

module.exports = config;
