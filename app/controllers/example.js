class ExampleController {
  constructor(model, logger) {
    this.model = model;
    this.logger = logger;
  }

  async list() {
    return this.model.list();
  }

  async get(id) {
    return this.model.get(id);
  }
}

module.exports = ExampleController;
