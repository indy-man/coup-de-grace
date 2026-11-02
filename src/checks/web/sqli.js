const{get}=require('../../http.js'),{Finding}=require('../../finding.js'),{URL}=require('node:url');
const PL=[{p:"'",n:'single-quote'},{p:"' OR '1'='1",n:'or-true'},{p:"' UNION SELECT NULL--",n:'union'}];
const PAT=[/sql syntax/i,/mysql_fetch/i,/ORA-\d{5}/,/PostgreSQL.*ERROR/i,/SQLSTATE/i,/PDOException/i,/mysqli_/i];
async function checkSQLi(t){const f=[],u=new URL(t),params=[...u.searchParams.entries()];if(!params.length)params.push(['id','1'],['q','test']);for(const[param]of params){for(const test of PL){try{const tu=new URL(t);tu.searchParams.set(param,test.p);const r=await get(tu.href,{timeout:8000});for(const pat of PAT){if(pat.test(r.body)){f.push(new Finding({title:`SQL injection in "${param}"`,severity:'critical',description:`${test.n} payload triggered DB error.`,evidence:`Payload: ${test.p}`,remediation:'Use parameterized queries.',category:'injection',cwe:'CWE-89'}));return f;}}}catch{}}}return f;}
module.exports={checkSQLi};
// edge case fix
