import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js'


use(chaiHttp);


let token = ''


describe('UPDATE ROLE USER TESTS', () => {

    before('it should login the user', async () => {
        const res = await request(app).post('/api/v1/users/login').send({
            email: 'yangeney@gmail.com',
            password: 'password'
        });
        token = res.body.payload.accesstoken;
        console.log(res.body.payload.accesstoken)
    });

    it('should assign a role to a user', async () => {

        const res = await request(app).patch('/api/v1/users/updateRole/4')
            .send({
                email: 'seeduser@gmail.com',
            })
            .set('Authorization', `Bearer ${token}`);
        expect(res).to.have.status([200]);


    });

    it("should not assign a role to a user if role doesn't exist", async () => {

        const res = await request(app)
            .patch('/api/v1/users/updateRole/9')
            .send({
                email: 'seeduser@gmail.com',

            }).set('Authorization', `Bearer ${token}`);

        expect(res).to.have.status([400]);
    });

    it("should not assign a role a user if email doesn't exist", async () => {

        const res = await request(app)
            .patch('/api/v1/users/updateRole/4')
            .send({
                email: 'seedusgmail.com',

            }).set('Authorization', `Bearer ${token}`);

        expect(res).to.have.status([400]);
    });


});
