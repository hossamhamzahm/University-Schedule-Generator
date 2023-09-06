import request from 'supertest';
import app from '../../index';

process.env.NODE_ENV = "test";


describe('Testing section Endpoints', () => {
    describe('Creating sections', () => {
        const student = {
            student_username: 'student1',
            student_password: '123456',
            f_name: 'Ziad',
            m_name: 'mohamed',
            l_name: 'Khaled',
            student_faculty: 'EAS',
        };

        const instructor = {
            instructor_username: 'instructor1',
            f_name: 'Ziad',
            m_name: 'mohamed',
            l_name: 'Khaled',
            instructor_faculty: 'EAS',
        };


        const section = {
            instructor_username: 'instructor1',
            course_code: 'ecen232',
            section_name: '1A',
            section_type: 'Lab',
            section_day: 'Sunday',
            section_from: new Date(),
            section_to: new Date(),
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


        it('Register a new instructor', (done) => {
            request(app)
                .post('/instructors')
                .set({ Authorization: `Bearer ${token}` })
                .send({ instructor })
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



        it('Create a new section', (done) => {
            request(app)
                .post('/sections')
                .set({ Authorization: `Bearer ${token}` })
                .send({ section })
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


        it('Index sections', (done) => {
            request(app)
                .get('/sections')
                .set({ Authorization: `Bearer ${token}` })
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        console.error(err);
                        console.log(res.body);
                        return done.fail();
                    }
                    
                    expect(Array.isArray(res.body.results)).toBeTruthy();
                    return done();
                });
        });

        it('Remove section', (done) => {
            request(app)
                .delete(`/sections/${section.course_code}/${section.section_name}/${section.section_type}`)
                .set({ Authorization: `Bearer ${token}` })
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        console.log(res.body);
                        // console.log(err)
                        return done.fail();
                    }
                    expect(typeof res.body.msg).toBe('string');
                    return done();
                });
        });


        it('Remove course', (done) => {
            request(app)
                .delete(`/courses/${section.course_code}`)
                .set({ Authorization: `Bearer ${token}` })
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        console.log(res.body);
                        // console.log(err)
                        return done.fail();
                    }
                    expect(typeof res.body.msg).toBe('string');
                    return done();
                });
        });


        it('Deactivate instructor Account', (done) => {
            request(app)
                // @ts-ignore
                .delete(`/instructors/${instructor.instructor_username}`)
                .set({ Authorization: `Bearer ${token}` })
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        console.log(res.body);
                        // console.log(err)
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
                        // console.log(err)
                        return done.fail();
                    }
                    return done();
                });
        });
    });
});