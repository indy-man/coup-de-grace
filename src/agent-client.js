const{request}=require('./http.js');
class AgentClient{
constructor(ep,opts={}){this.endpoint=ep;this.timeout=opts.timeout||15000;this.headers=opts.headers||{};}
async send(msg,opts={}){const r=await request(this.endpoint,{method:'POST',headers:{'Content-Type':'application/json',...this.headers},body:JSON.stringify({messages:[{role:'user',content:msg}],...opts}),timeout:this.timeout});let p;try{p=JSON.parse(r.body);}catch{p={raw:r.body};}return{status:r.status,body:p,text:p.choices?.[0]?.message?.content||p.content?.[0]?.text||p.response||p.output||p.raw||r.body};}
async listTools(){try{const r=await request(this.endpoint.replace(/\/chat|\/completions/,'/tools'),{method:'GET',headers:this.headers,timeout:this.timeout});return JSON.parse(r.body);}catch{return null;}}}
module.exports={AgentClient};
