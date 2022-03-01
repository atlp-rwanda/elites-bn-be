import chai from 'chai';
import { testFunc } from '../src/controllers/test.controllers';

const should = chai.should()

describe('TEST', function () {

    describe('TESTING', function () {
        it('should return true', function () {
            testFunc().should.equal(true);
        });
    });

});