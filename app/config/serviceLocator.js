const Redis = require('redis');

const config = require('app/config/config.js');
const ExampleController = require('app/controllers/example.js');
const ExampleModel = require('app/models/example.js');
const ExampleRepository = require('app/repositories/example.js');

const logger = require('pino')(config.logging);

const redis = Redis.createClient();
const exampleRepository = new ExampleRepository(redis, logger);
const exampleModel = new ExampleModel(exampleRepository, logger);
const exampleController = new ExampleController(exampleModel, logger);

redis.on('error', (error) => {
  logger.error('REDIS ERROR: ', error);
});

module.exports = {
  redis,
  logger,
  exampleRepository,
  exampleModel,
  exampleController,
};
