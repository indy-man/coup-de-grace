const{post}=require('../../http.js'),{Finding}=require('../../finding.js');
const CREDS=[{u:'admin',p:'admin'},{u:'admin',p:'password'},{u:'root',p:'root'},{u:'test',p:'test'}];
const PATHS=['/login','/admin','/admin/login'];
async function checkDefaultCreds(t){const f=[],b=t.replace(/\/+$/,'');for(const path of PATHS){for(const c of CREDS){try{const r=await post(b+path,`username=${c.u}&password=${c.p}`,{headers:{'Content-Type':'application/x-www-form-urlencoded'},timeout:5000});if(r.status>=200&&r.status<400&&!r.body.toLowerCase().includes('invalid')&&(r.headers.location||'').includes('dashboard')){f.push(new Finding({title:`Default creds work at ${path}`,severity:'critical',evidence:`${c.u}/${c.p}`,remediation:'Change default credentials.',category:'default-creds',cwe:'CWE-798'}));return f;}}catch{}}}return f;}
module.exports={checkDefaultCreds};
