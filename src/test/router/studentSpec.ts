import request from 'supertest';
import app from '../../index';

process.env.NODE_ENV = "test";


describe('Testing Student Endpoints', () => {
    describe('Create new student', () => {
        const student = {
            student_username: 'student1',
            student_password: '123456',
            f_name: 'Ziad',
            m_name: 'mohamed',
            l_name: 'Khaled',
            student_faculty: 'EAS',
        };
        let token: string;
        let payload: string;

        it('Register a new student', (done) => {
            request(app)
                .post('/students')
                .send({ student })
                .expect(201)
                .end(function (err, res) {
                    if (err) {
                        console.error(err);
                        console.log(res.body);
                        return done.fail();
                    }
                    expect(typeof res.body.AccessToken).toBe('string');
                    token = res.body.AccessToken;
                    payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
                    return done();
                });
        });

        it('Student Logout', (done) => {
            request(app)
                .post('/logout')
                .set({ Authorization: `Bearer ${token}` })
                .expect(200)
                .end(function (err, res) {
                    if (err) return done.fail();
                    return done();
                });
        });


        it('Student Login failure: Wrong student credentials', (done) => {
            request(app)
                .post('/login')
                .send({
                    student: {
                        student_username: 'student2',
                        student_password: '12345679'
                    }
                })
                .expect(403)
                .end(function (err, res) {
                    if (err) {
                        console.log(res.body);
                        return done.fail();
                    }
                    return done();
                });
        });


        it('Student Login', (done) => {
            request(app)
                .post('/login')
                .send({
                    student: {
                        student_username: 'student1',
                        student_password: '123456'
                    }
                })
                .end(function (err, res) {
                    if (err) return done.fail();
                    expect(typeof res.body.AccessToken).toBe('string');
                    token = res.body.AccessToken;
                    payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
                    return done();
                });
        });


        it('Deactivate Student Account', (done) => {
            request(app)
                // @ts-ignore
                .delete(`/students/${payload.student_username}`)
                .set({ Authorization: `Bearer ${token}` })
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        console.log(res.body);
                        console.log(err)
                        return done.fail();
                    }
                    return done();
                });
        });
    });
});
// .expect(200).end((err, res) => {
//     expect(res.body).toEqual(anticipated_result);