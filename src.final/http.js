const https=require('node:https'),http=require('node:http'),{URL}=require('node:url');
const UA={'User-Agent':'blackwall/0.5.0','Accept':'*/*'};
async function request(url,opts={}){return new Promise((resolve,reject)=>{const p=new URL(url),m=p.protocol==='https:'?https:http;const r=m.request(p,{method:opts.method||'GET',headers:{...UA,...opts.headers},timeout:opts.timeout||10000},(res)=>{const c=[];res.on('data',d=>c.push(d));res.on('end',()=>resolve({status:res.statusCode,headers:res.headers,body:Buffer.concat(c).toString(),url:p.href}));});r.on('error',reject);r.on('timeout',()=>{r.destroy();reject(new Error('timeout'));});if(opts.body)r.write(opts.body);r.end();});}
async function get(u,o){return request(u,{...o,method:'GET'});}
async function post(u,b,o){return request(u,{...o,method:'POST',body:b});}
async function head(u,o){return request(u,{...o,method:'HEAD'});}
module.exports={request,get,post,head};
