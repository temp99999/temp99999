const express = require('express');
const http = require('http');
const pinoHttp = require('pino-http');

const config = require('./app/config/config');
const routes = require('./app/routes/routes');
const serviceLocator = require('./app/config/serviceLocator');

const app = express();
const server = http.createServer(app);
const { port } = config.webserver;

// automatic request logging
if (config.webserver.loggingEnabled) {
  app.use(pinoHttp());
}

routes.setup(app, serviceLocator);

server.listen(port, () => {
  const { logger } = serviceLocator;
  logger.info(`Server running at port ${port}`);
});

module.exports = app;