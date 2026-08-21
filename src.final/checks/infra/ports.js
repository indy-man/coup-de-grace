const net=require('node:net'),{URL}=require('node:url'),{Finding}=require('../../finding.js');
const PORTS=[{p:21,s:'FTP'},{p:22,s:'SSH'},{p:23,s:'Telnet'},{p:3306,s:'MySQL'},{p:5432,s:'PostgreSQL'},{p:6379,s:'Redis'},{p:27017,s:'MongoDB'},{p:9200,s:'Elasticsearch'}];
const BAD=[23,3306,5432,6379,27017,9200];
function probe(h,p,ms=3000){return new Promise(r=>{const s=new net.Socket();s.setTimeout(ms);s.on('connect',()=>{s.destroy();r(true);});s.on('timeout',()=>{s.destroy();r(false);});s.on('error',()=>{s.destroy();r(false);});s.connect(p,h);});}
async function checkPorts(t){const f=[],h=new URL(t).hostname;for(const{p,s}of PORTS){try{if(await probe(h,p)){const bad=BAD.includes(p);f.push(new Finding({title:`${s} port ${p} open`,severity:bad?'high':'info',description:bad?'Should not be public.':'',remediation:bad?`Close port ${p} externally.`:'Verify this should be public.',category:'ports',cwe:bad?'CWE-200':null}));}}catch{}}return f;}
module.exports={checkPorts};
