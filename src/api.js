const{Scanner,CHECK_REGISTRY}=require('./scanner.js'),{detectType}=require('./detect.js'),{Finding,SEVERITIES}=require('./finding.js'),{loadConfig}=require('./config.js');
async function scan(t,opts={}){const cfg=loadConfig();const type=opts.type||await detectType(t);return new Scanner(t,type,{...cfg,...opts}).run();}
function getChecks(type){return CHECK_REGISTRY[type]||[];}
module.exports={scan,getChecks,Scanner,Finding,SEVERITIES,detectType,loadConfig};
