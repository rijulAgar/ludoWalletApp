const formatBalance=(req:any)=>{
    console.log(req)
    return parseInt(req).toString()
}
const formatChainAsNum=(chain:any)=>{
    console.log(chain)
    return parseInt(chain)
}

export {formatBalance,formatChainAsNum}