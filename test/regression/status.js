'use strict';

let config = require('app/config/config');
let server = require('server');
let request = require('supertest')(server);
let joi = require('konga-joi');

let authHelper  = require('test/helpers/auth_mock');
const token = 'access_token=' + authHelper.access_token;
let authScopes  = require('test/helpers/auth_scopes');

describe('GET /v1/status', () => {

    beforeEach(() => {
        authHelper.validate(authScopes);
    });

    it('Endpoint should successfully check health status', done => {
        request.get('/v1/status/?' + token)
            .send({})
            .expect('Content-type', /json/)
            .expect(200)
            .expect(res => {
                const schema = {
                    status: joi.string().valid('success').required(),
                    data: joi.object().keys({
                        name: joi.string().valid(config.appName).required(),
                        platform: joi.string().required(),
                        uptime_min: joi.number().required(),
                        node_version: joi.string().required(),
                        memory_usage: joi.object().keys({
                            rss: joi.number().required(),
                            heapTotal: joi.number().required(),
                            heapUsed: joi.number().required(),
                        }),
                        connection_status: joi.object().keys({
                            redis: joi.boolean().valid(true),
                            mysql: joi.boolean().valid(true),
                        }),
                        timing_ms: joi.object().keys({
                            redis: joi.number().required(),
                            mysql: joi.number().required()
                        }),
                        app_version: joi.string().required(),
                        dep_versions: joi.object().keys({
                            'custom-error-generator': joi.string().required(),
                            'http-status': joi.string().required(),
                            mysql: joi.string().required(),
                            knex: joi.string().required(),
                            'konga-joi': joi.string().required(),
                            'konga-logging': joi.string().required(),
                            'konga-metrics': joi.string().required(),
                            'konga-oauth2': joi.string().required(),
                            'konga-oauth2-restify-middleware': joi.string().required(),
                            'konga-redis': joi.string().required(),
                            'konga-restify-jsend-formatter': joi.string().required(),
                            'konga-restify-route-table': joi.string().required(),
                            'konga-routestats': joi.string().required(),
                            'konga-service-locator': joi.string().required(),
                            'konga-validation-restify-middleware': joi.string().required(),
                            restify: joi.string().required(),
                            'konga-restify-url-semver': joi.string().required(),
                            shortid: joi.string().required(),
                            newrelic: joi.string().required()
                        })
                    })
                };

                joi.assert(res.body, schema);
            })
            .end(done);
    });
});
