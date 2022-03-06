import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

use(chaiHttp);

describe('WELCOME TEST', function() {
    it('SHOULD RETURN 200', function(done){
        request(app)
        .get('/api/v1/')
        .end((err, res)=>{
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
});