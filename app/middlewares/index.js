const jwt = require('jsonwebtoken');

const auth = (req, res ,next) => {
    try{
        const { token } =  req.headers;
        let { data } = jwt.verify(token, process.env.TOKEN);
        req.query.userId = data.userId;
        req.query.companyId = data.companyId;

        req.body.userId = +data.userId;
        req.body.companyId = +data.companyId;

        req.data = data;
        next();
    }catch(e){
        return res.status(200).json({status: 401, msg: 'Please Relogin And Try Again!', result:{} })
    }
}

const isAdmin = (req, res ,next) => {
    try{
        const { id, isAdmin } = req.data;
        if(isAdmin){
            next();
        }else{
            return res.status(200).json({status:403, msg: 'Permission Denied!', result:{}});
        }
    }catch(e){
        return res.status(200).json({status:500, msg: 'Something went wrong!', result:{}})
    }
}

module.exports = { auth, isAdmin }