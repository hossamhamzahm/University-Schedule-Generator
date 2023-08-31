import request from 'supertest';
import app from '../index';


process.env.NODE_ENV = "test";


describe('Testing invalid Requests URL', () => {
    describe('Wrong paths', () => {
        it('wrong path1: visit /stdent path \nshould result in 404', (done) => {
            request(app)
                .get('/stdent')
                .expect(404)
                .end(function (err, res) {
                    if (err) return done.fail();
                    return done();
                });
        });

        it('wrong path2: visit /admin/ path \nshould result in 404', (done) => {
            request(app)
                .get('/admin')
                .expect(404)
                .end(function (err, res) {
                    if (err) return done.fail();
                    return done();
                });
        });
    });
});