const assert = require("assert");
const deferred = require("./index");

describe('delay-promise-func', function(){
    this.timeout(300 * 1000);

    it('should wait 500ms before fire func', ()=> {
        var start = Date.now();

        const d = deferred(()=>{
            const delta = Date.now() - start;
            return Promise.resolve(delta);
        }, 500);

        return d().then(res => {
            let delta = Date.now() - start;
            assert.ok( delta > 450 && delta < 550, "delayed.then should fire in 500ms while it is " + delta);
            assert.ok( res > 450 && res < 550, "it should fire finc in 500ms while it is " + delta);
        })
    })

    it('should pass args to promise func', ()=> {
        const d = deferred((...rest)=>{
            return Promise.resolve(rest);
        }, 100);

        return d(3, 2, 1).then(res => {
            assert.deepEqual( res, [3, 2, 1]);
        })
    })

    it('should resolve if func returns resolved promise', ()=> {
        const d = deferred(()=>Promise.resolve(123), 100);

        return d().then(res => {
            assert.equal( res, 123);
        })
    })

    it('should reject if func returns rejected promise', ()=> {
        const d = deferred(()=>Promise.reject(123), 100);

        return d()
        .then(res => {
            assert.fail("should return rejected Promise");
        })        
        .catch(res => {
            assert.equal( res, 123);
        })
    })

    it('should return Promise anyway (value -> resolved Promise)', ()=> {
        const d = deferred(()=>"abc", 100);

        return d().then(res => {
            assert.equal( res, "abc");
        })
    })

    it('should return Promise anyway (undefined -> resolved Promise)', ()=> {
        const d = deferred(()=>{}, 100);

        return d().then(res => {
            assert.equal( res, undefined);
        })
    })

    it('should return Promise anyway (null -> resolved Promise)', ()=> {
        const d = deferred(()=>{return null}, 100);

        return d().then(res => {
            assert.equal( res, null);
        })
    })
    

    it('should return Promise anyway (Error -> rejected Promise)', ()=> {
        const d = deferred(()=>{
            throw new Error("err");
        }, 100);

        return d()
        .then(res => {
            assert.fail("should return rejected Promise");
        })        
        .catch(err => {
            assert.ok( err instanceof Error, "err should be instance of Error");
            assert.equal( err, "Error: err");
        })
    })
})