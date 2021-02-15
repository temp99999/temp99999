let server = require('server');
let request = require('supertest')(server);

describe('Express Webserver', () => {

  beforeEach(function () {
    sandbox.restore()
  });

  after(() => {
    server.close();
  });

  it('GET /', () => {
    return request.get('/')
      // .send({})
      // .expect('Content-type', /json/)
      .expect(200)
      // .expect(res => {
      //     const schema = {
      //         status: joi.string().valid('error').required(),
      //         message: joi.string().required(),
      //         code: joi.string().valid('ACCESS_DENIED').required()
      //     };
      //     joi.assert(res.body, schema);
      // })
      // .end(done);
  });
});