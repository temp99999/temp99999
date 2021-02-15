/* eslint class-methods-use-this: ["error", { "exceptMethods": ["fakeObj"] }] */

const { promisify } = require('util');

class ExampleRepository {
  constructor(redis, logger) {
    this.redis = redis;
    this.logger = logger;
  }

  fakeObj(id) {
    return {
      id,
      model: `Example ${id}`,
    };
  }

  findAll() {
    return [
      this.fakeObj(1),
      this.fakeObj(2),
      this.fakeObj(3),
    ];
  }

  async findById(id) {
    const redisGetAsync = promisify(this.redis.get).bind(this.redis);
    const fromRedis = await redisGetAsync(id);

    let result;
    if (fromRedis) {
      result = JSON.parse(fromRedis);
      result.wasInRedis = true;
    } else {
      result = this.fakeObj(id);
      this.redis.set(id, JSON.stringify(result));
    }

    this.logger.info(result);
    return result;
  }
}

module.exports = ExampleRepository;
