if(process.env.NODE_ENV === 'prouction'){
    module.exports = require('./prod')
}else{
    module.exports = require('./dev')
}