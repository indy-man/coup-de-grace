const{describe,it}=require('node:test'),assert=require('node:assert'),{getProfile,PROFILES}=require('../src/profiles.js');
describe('Profiles',()=>{it('quick has 2 checks',()=>{assert.strictEqual(getProfile('quick').length,2);});it('deep is null',()=>{assert.strictEqual(getProfile('deep'),null);});it('unknown returns null',()=>{assert.strictEqual(getProfile('x'),null);});});
