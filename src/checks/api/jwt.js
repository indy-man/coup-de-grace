const{get}=require('../../http.js'),{Finding}=require('../../finding.js');
function mkJWT(h,p){const b=o=>Buffer.from(JSON.stringify(o)).toString('base64url');return`${b(h)}.${b(p)}.`;}
async function checkJWT(t){const f=[];const tok=mkJWT({alg:'none',typ:'JWT'},{sub:'1',role:'admin',iat:Math.floor(Date.now()/1000)});try{const r=await get(t,{headers:{Authorization:`Bearer ${tok}`},timeout:8000});if(r.status===200)f.push(new Finding({title:'JWT accepts alg:none',severity:'critical',remediation:'Reject alg:none. Always verify signatures.',category:'jwt',cwe:'CWE-347'}));}catch{}return f;}
module.exports={checkJWT};
