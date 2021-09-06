const knex = require('../db/knex');
const expect = require('chai').expect;
const request = require('supertest');

const app = require('../app');
    
describe('CRUD Stickers', () => {
 before((done) => {
    //run migrations
    knex.migrate.latest()
        .then(() => {
            //run seeds
            return knex.seed.run();
        }).then(() => done());
    });

    it('List all records', (done) => {
        request(app)
            .get('/api/v1/stickers')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('array');
                console.log(response.body);
                done();
            });
    });
});