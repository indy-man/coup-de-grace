class CoupdeError extends Error{constructor(m,c){super(m);this.name='CoupdeError';this.code=c;}}
class ConnectionError extends CoupdeError{constructor(t,c){super(`Could not connect to ${t}: ${c}`,'CONNECTION_ERROR');this.target=t;}}
class TimeoutError extends CoupdeError{constructor(t,ms){super(`Request to ${t} timed out after ${ms}ms`,'TIMEOUT');this.target=t;}}
class ConfigError extends CoupdeError{constructor(m){super(m,'CONFIG_ERROR');}}
module.exports={CoupdeError,ConnectionError,TimeoutError,ConfigError};
