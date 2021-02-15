const joi = require('joi');

module.exports.setup = function setup(server, serviceLocator) {
  const examples = serviceLocator.exampleController;
  const { logger } = serviceLocator;

  server.get('/', (req, res) => examples.list().then((result) => {
    res.status(200).send(result);
  }));

  server.get('/:id', (req, res) => {
    const { id } = req.params;

    const schema = joi.object({
      id: joi.number().min(1).max(100),
    });

    const validationErrors = schema.validate(req.params);
    if (validationErrors.error) {
      logger.info(validationErrors);
      return res.status(200).send(validationErrors.error.details[0].message);
    }
    return examples.get(id).then((result) => {
      res.status(200).send(result);
    });
  });
};
