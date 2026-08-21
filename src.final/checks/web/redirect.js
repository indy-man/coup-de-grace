const{request}=require('../../http.js'),{Finding}=require('../../finding.js'),{URL}=require('node:url');
const PARAMS=['url','redirect','next','return','returnUrl','redirect_uri','continue','dest'];
async function checkOpenRedirect(t){const f=[];for(const p of PARAMS){try{const u=new URL(t);u.searchParams.set(p,'https://evil.com');const r=await request(u.href,{timeout:8000});if(r.status>=300&&r.status<400&&(r.headers.location||'').includes('evil.com')){f.push(new Finding({title:`Open redirect via "${p}"`,severity:'medium',evidence:`Location: ${r.headers.location}`,remediation:'Validate redirect URLs against whitelist.',category:'redirect',cwe:'CWE-601'}));break;}}catch{}}return f;}
module.exports={checkOpenRedirect};
