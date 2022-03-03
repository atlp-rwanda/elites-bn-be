import { expect, request, use } from 'chai'
import { testFunc } from '../src/controllers/test.controllers';

describe('TEST', function () {

    describe('TESTING', function () {
        it('should return true', function () {
            expect(testFunc()).to.equal(true)
        });
    });

});