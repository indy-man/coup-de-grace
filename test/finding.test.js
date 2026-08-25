const{describe,it}=require('node:test'),assert=require('node:assert'),{Finding,SEVERITIES}=require('../src/finding.js');
describe('Finding',()=>{it('creates with fields',()=>{const f=new Finding({title:'x',severity:'high'});assert.strictEqual(f.severity,'high');});it('defaults bad severity',()=>{assert.strictEqual(new Finding({title:'x',severity:'z'}).severity,'info');});it('serializes',()=>{assert.ok(new Finding({title:'x',severity:'low'}).toJSON().timestamp);});});
describe('SEVERITIES',()=>{it('has 5',()=>{assert.strictEqual(SEVERITIES.length,5);});});
