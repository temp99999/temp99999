'use strict';

let server = require('server');
let request = require('supertest')(server);
let joi = require('konga-joi');

let authHelper  = require('test/helpers/auth_mock');
const token = 'access_token=' + authHelper.access_token;
let authScopes  = require('test/helpers/auth_scopes');

//let expect = require('chai').expect;

describe('POST /examples', () => {

    beforeEach(() => {
        authHelper.validate(authScopes);
    });

    it('Endpoint should fail without access token', done => {
        request.post('/v1/examples')
        .send({})
        .expect('Content-type', /json/)
        .expect(403)
        .expect(res => {
            const schema = {
                status: joi.string().valid('error').required(),
                message: joi.string().required(),
                code: joi.string().valid('ACCESS_DENIED').required()
            };
            joi.assert(res.body, schema);
        })
        .end(done);
    });

    it('Endpoint should successfully fetch example record', done => {
        let id = 5;
        request.get('/v1/examples/' + id + '?' + token)
        .send({})
        .expect('Content-type', /json/)
        .expect(200)
        .expect(res => {
            const schema = {
                status: joi.string().valid('success').required(),
                data: joi.object().keys({
                    id: joi.number().valid(id).required(),
                    model: joi.string().valid('Example ' + id).required()
                })
            };
            joi.assert(res.body, schema);
        })
        .end(done);
    });
});
