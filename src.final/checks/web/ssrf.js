const{get}=require('../../http.js'),{Finding}=require('../../finding.js'),{URL}=require('node:url');
const PARAMS=['url','src','href','link','uri','file','fetch'];
const INT=['http://127.0.0.1','http://169.254.169.254/latest/meta-data/','http://localhost'];
async function checkSSRF(t){const f=[];for(const p of PARAMS){for(const i of INT){try{const u=new URL(t);u.searchParams.set(p,i);const r=await get(u.href,{timeout:8000});if(r.status===200&&r.body.length>100){const b=r.body.toLowerCase();if(b.includes('ami-id')||b.includes('root:')||b.includes('localhost')){f.push(new Finding({title:`SSRF via "${p}"`,severity:'critical',evidence:`Internal: ${i}`,remediation:'Whitelist URLs. Block internal IPs.',category:'ssrf',cwe:'CWE-918'}));return f;}}}catch{}}}return f;}
module.exports={checkSSRF};
