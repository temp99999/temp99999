class ExampleModel {
  constructor(repository, logger) {
    this.repository = repository;
    this.logger = logger;
  }

  list() {
    return this.repository.findAll();
  }

  get(id) {
    return this.repository.findById(id);
  }
}

module.exports = ExampleModel;
