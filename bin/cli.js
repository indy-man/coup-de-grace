#!/usr/bin/env node
const{parseArgs}=require('node:util'),{run}=require('../src/index.js');
const opts={target:{type:'string',short:'t'},type:{type:'string',default:'auto'},output:{type:'string',short:'o',default:'stdout'},format:{type:'string',short:'f',default:'text'},verbose:{type:'boolean',short:'v',default:false},help:{type:'boolean',short:'h',default:false},version:{type:'boolean',default:false},timeout:{type:'string',default:'10000'},skip:{type:'string'},only:{type:'string'},profile:{type:'string'},'min-severity':{type:'string'},webhook:{type:'string'},stream:{type:'boolean',default:false}};
let values,positionals;try{({values,positionals}=parseArgs({options:opts,allowPositionals:true}));}catch(e){console.error('error:',e.message);process.exit(1);}
if(values.version){console.log(`blackwall v${require('../package.json').version}`);process.exit(0);}
if(values.help||(!values.target&&!positionals.length)){console.log(`\n  blackwall - security scanner for websites, APIs, and AI agents\n\n  usage:\n    blackwall <url>\n    blackwall --target <url> --type <web|api|agent|infra>\n\n  options:\n    -t, --target       target URL\n    --type             auto, web, api, agent, infra\n    -o, --output       output file (default: stdout)\n    -f, --format       text, json, md\n    --skip             skip checks (comma-separated)\n    --only             run only these checks\n    --profile          quick, standard, deep\n    --min-severity     filter: critical, high, medium, low\n    --webhook          POST results to URL\n    --stream           stream JSON output\n    --timeout          request timeout ms\n    --version          print version\n    -h, --help         show this\n\n  examples:\n    blackwall https://example.com\n    blackwall https://api.example.com/v1 --type api\n    blackwall https://agent.com/chat --type agent -f json\n    blackwall https://example.com --profile quick\n    blackwall https://example.com --skip sensitive-paths,cookies\n`);process.exit(0);}
const target=values.target||positionals[0];values.timeout=parseInt(values.timeout,10);values.minSeverity=values['min-severity'];
run({target,...values}).catch(e=>{console.error('scan failed:',e.message);process.exit(1);});
// agent type support
// --skip
// --only
// --min-severity
// --profile
