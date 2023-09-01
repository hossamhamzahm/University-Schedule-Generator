import request from 'supertest';
import app from '../../index';

process.env.NODE_ENV = "test";


describe('Testing Course Endpoints', () => {
    describe('courses: ', () => {
        const student = {
            student_username: 'student1',
            student_password: '123456',
            f_name: 'Ziad',
            m_name: 'mohamed',
            l_name: 'Khaled',
            student_faculty: 'EAS',
        };

        const course = {
            course_code : "ECEN101",
            course_name : "Introduction to circuits",
        }

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


        it('Create a new course', (done) => {
            request(app)
                .post('/courses')
                .set({ Authorization: `Bearer ${token}` })
                .send({ course })
                .expect(201)
                .end(function (err, res) {
                    if (err) {
                        console.error(err);
                        console.log(res.body);
                        return done.fail();
                    }
                    expect(typeof res.body.msg).toBe('string');
                    return done();
                });
        });

        it('Update course', (done) => {
            course.course_name = "changed";
            request(app)
                .patch(`/courses/${course.course_code}`)
                .set({ Authorization: `Bearer ${token}` })
                .send({ course })
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        console.error(err);
                        console.log(res.body);
                        return done.fail();
                    }
                    expect(typeof res.body.msg).toBe('string');
                    return done();
                });
        });

        it('Remove course', (done) => {
            request(app)
                // @ts-ignore
                .delete(`/courses/${course.course_code}`)
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