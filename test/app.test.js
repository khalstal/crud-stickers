const knex = require('../db/knex');
const expect = require('chai').expect;
const request = require('supertest');

const app = require('../app');
const fixtures = require('./fixtures');
    
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
                done();
            });
    });

    it('Show one record by id', (done) => {
        request(app)
            .get('/api/v1/stickers/92')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                expect(response.body).to.deep.equal(fixtures.stickers[91]);
                
            });
            done();
    });

    it('Show one record by id', (done) => {
        request(app)
            .get('/api/v1/stickers/93')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                expect(response.body).to.deep.equal(fixtures.stickers[92]);
                
            });
            done();
    });

    it('Creates a Record', (done) => {
        request(app)
            .post('/api/v1/stickers')
            .send(fixtures.sticker)
            .set('Accept', 'application/json')
            .expect('Content-Type', '/json/')
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                fixtures.sticker.id = response.body.id;
                expect(response.body).to.deep.equal(fixtures.sticker);
            });
            done(); 
    });

    it('Updates a record', (done) => {
        fixtures.sticker.rating = 10;
        request(app)
            .put('/api/v1/stickers/156')
            .send(fixtures.sticker)
            .set('Accept', 'application/json')
            .expect('Content-Type', '/json/')
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                expect(response.body).to.deep.equal(fixtures.sticker);
            });
            done();
    });

    it('Deletes a record', (done) => {
        request(app)
            .delete('/api/v1/stickers/156')
            .send(fixtures.sticker)
            .set('Accept', 'application/json')
            .expect('Content-Type', '/json/')
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                expect(response.body).to.deep.equal({
                    deleted: true
                });
            });
            done();
    });
});