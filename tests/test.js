import { expect, request, use } from 'chai'
import chaiHttp from 'chai-http'
import { testing } from '../src/controllers/test.controller'

describe('TEST', ()=>{
    it('SHOULD RETURN TRUE', ()=>{
        expect(testing()).to.equal(true)
    })
})