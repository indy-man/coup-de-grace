const{get}=require('../../http.js'),{Finding}=require('../../finding.js');
async function checkRateLimit(t){const f=[],res=[];const ps=[];for(let i=0;i<20;i++)ps.push(get(t,{timeout:5000}).then(r=>res.push(r.status)).catch(()=>res.push(0)));await Promise.all(ps);const ok=res.filter(s=>s===200).length;if(ok>=18)f.push(new Finding({title:'No rate limiting',severity:'medium',evidence:`${ok}/20 succeeded`,remediation:'Add rate limiting. Return 429.',category:'rate-limit',cwe:'CWE-770'}));return f;}
module.exports={checkRateLimit};
