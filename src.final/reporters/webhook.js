const{request}=require('../http.js');
async function sendWebhook(url,results){await request(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({target:results.target,type:results.type,findings:results.findings.length,summary:{critical:results.findings.filter(f=>f.severity==='critical').length,high:results.findings.filter(f=>f.severity==='high').length},timestamp:new Date().toISOString()}),timeout:10000});}
module.exports={sendWebhook};
