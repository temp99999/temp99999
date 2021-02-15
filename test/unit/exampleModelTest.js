const sinon = require('sinon');
const expect = require('chai').expect;

const sandbox = sinon.createSandbox()

const ExampleModel = require('app/models/example');

// const fakeRepository = {}
const fakeLogger = {};

describe('ExampleModel', () => {
  beforeEach(function () {
    sandbox.restore()
  });

  it('get', (done) => {
    const fakeRepository = {
      findAll: sandbox.fake(),
      findById: sandbox.fake(),
    }

    var model = new ExampleModel(fakeRepository, fakeLogger);
    model.get(1);

    expect(fakeRepository.findAll.callCount).to.equal(0);
    expect(fakeRepository.findById.callCount).to.equal(1);
    done();
  });

  it('list', (done) => {
    const fakeRepository = {
      findAll: sandbox.fake(),
      findById: sandbox.fake(),
    }

    var model = new ExampleModel(fakeRepository, fakeLogger);
    model.list();

    expect(fakeRepository.findAll.callCount).to.equal(1);
    expect(fakeRepository.findById.callCount).to.equal(0);
    done();
  });


});