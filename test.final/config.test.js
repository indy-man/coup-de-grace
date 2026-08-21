const{describe,it}=require('node:test'),assert=require('node:assert'),{loadConfig,DEFAULT_CONFIG}=require('../src/config.js');
describe('Config',()=>{it('returns defaults',()=>{assert.strictEqual(loadConfig('/x').timeout,10000);});it('has rate limit',()=>{assert.strictEqual(loadConfig('/x').rateLimit.requestsPerSecond,10);});});
