const fs=require('node:fs'),path=require('node:path');
const FILES=['blackwall.json','blackwall.config.json','.blackwallrc','.blackwallrc.json'];
const DEFAULTS={timeout:10000,maxRedirects:5,userAgent:'blackwall/0.5.0',checks:{web:{enabled:true},agent:{enabled:true},api:{enabled:true},infra:{enabled:true}},output:{format:'text',file:null},rateLimit:{requestsPerSecond:10,delayMs:100}};
function merge(a,b){const r={...a};for(const k of Object.keys(b)){r[k]=typeof b[k]==='object'&&!Array.isArray(b[k])&&a[k]?merge(a[k],b[k]):b[k];}return r;}
function loadConfig(dir=process.cwd()){for(const n of FILES){const f=path.join(dir,n);if(fs.existsSync(f)){try{return merge(DEFAULTS,JSON.parse(fs.readFileSync(f,'utf8')));}catch{}}}return{...DEFAULTS};}
module.exports={loadConfig,DEFAULT_CONFIG:DEFAULTS};
