async function withRetry(fn,{retries=2,delay=1000,backoff=2}={}){let e;for(let i=0;i<=retries;i++){try{return await fn();}catch(err){e=err;if(i<retries)await new Promise(r=>setTimeout(r,delay*Math.pow(backoff,i)));}}throw e;}
module.exports={withRetry};
