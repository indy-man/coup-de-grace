const PROFILES={quick:['tls','security-headers'],standard:['tls','security-headers','cors','cookies','sensitive-paths','sql-injection','xss'],deep:null};
function getProfile(name){return PROFILES[name]||null;}
module.exports={getProfile,PROFILES};
