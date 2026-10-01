const{describe,it}=require('node:test'),assert=require('node:assert');
describe('HTTP',()=>{it('exports functions',()=>{const h=require('../src/http.js');assert.ok(h.get&&h.post&&h.head&&h.request);});});
