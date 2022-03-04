import { expect, request, use } from 'chai'
import chaiHttp from 'chai-http'

function test() {
    return true
}

describe('TEST', ()=>{
    it('SHOULD RETURN TRUE', ()=>{
        expect(test()).to.equal(true)
    })
})