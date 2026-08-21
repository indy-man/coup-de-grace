class BlackwallError extends Error{constructor(m,c){super(m);this.name='BlackwallError';this.code=c;}}
class ConnectionError extends BlackwallError{constructor(t,c){super(`Could not connect to ${t}: ${c}`,'CONNECTION_ERROR');this.target=t;}}
class TimeoutError extends BlackwallError{constructor(t,ms){super(`Request to ${t} timed out after ${ms}ms`,'TIMEOUT');this.target=t;}}
class ConfigError extends BlackwallError{constructor(m){super(m,'CONFIG_ERROR');}}
module.exports={BlackwallError,ConnectionError,TimeoutError,ConfigError};
