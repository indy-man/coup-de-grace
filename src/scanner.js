const{checkHeaders}=require('./checks/web/headers.js'),{checkTLS}=require('./checks/web/tls.js'),{checkCORS}=require('./checks/web/cors.js');
const{formatText}=require('./reporters/text.js'),{formatJSON}=require('./reporters/json.js'),{formatMarkdown}=require('./reporters/markdown.js');
class Scanner{constructor(t,y,o={}){this.target=t;this.type=y;this.opts=o;this.findings=[];this.checks=[{name:'tls',fn:checkTLS},{name:'headers',fn:checkHeaders},{name:'cors',fn:checkCORS}];}
async run(){for(const c of this.checks)try{this.findings.push(...await c.fn(this.target));}catch{}const r={target:this.target,type:this.type,findings:this.findings};const f=this.opts.format||'text';let o;if(f==='json')o=formatJSON(r);else if(f==='md')o=formatMarkdown(r);else o=formatText(r);console.log(o);return r;}}
module.exports={Scanner};
