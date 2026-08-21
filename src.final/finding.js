const SEVERITIES=['critical','high','medium','low','info'];
class Finding{
constructor({title,severity,description,evidence,remediation,category,cwe}){
this.title=title;this.severity=SEVERITIES.includes(severity)?severity:'info';this.description=description||'';this.evidence=evidence||'';this.remediation=remediation||'';this.category=category||'general';this.cwe=cwe||null;this.timestamp=new Date().toISOString();}
toJSON(){return{title:this.title,severity:this.severity,description:this.description,evidence:this.evidence,remediation:this.remediation,category:this.category,cwe:this.cwe,timestamp:this.timestamp};}}
module.exports={Finding,SEVERITIES};
