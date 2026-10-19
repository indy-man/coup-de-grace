const{describe,it}=require('node:test'),assert=require('node:assert'),{AgentClient}=require('../src/agent-client.js');
describe('AgentClient',()=>{it('constructs',()=>{assert.strictEqual(new AgentClient('https://x.com').endpoint,'https://x.com');});it('has send',()=>{assert.strictEqual(typeof new AgentClient('x').send,'function');});});
