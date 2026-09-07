const{head}=require('../../http.js'),{Finding}=require('../../finding.js');
async function checkClickjack(t){const f=[];try{const r=await head(t);if(!r.headers['x-frame-options']&&!(r.headers['content-security-policy']||'').includes('frame-ancestors'))f.push(new Finding({title:'Clickjacking protection missing',severity:'medium',remediation:'Add X-Frame-Options: DENY or CSP frame-ancestors',category:'clickjacking',cwe:'CWE-1021'}));}catch{}return f;}
module.exports={checkClickjack};
