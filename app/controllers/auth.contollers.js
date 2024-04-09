const db = require("../models");
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
    try{
        const { username, password } = req.body;
        let data = await db.users.findOne({ where: { username, password } });
        if(data){
            const { id: userId, name, isAdmin } = data.toJSON();
            const token = jwt.sign({ data: {userId, name, isAdmin}}, process.env.TOKEN, { expiresIn: 60 * 60 * 6});
            const result = { token, isAdmin, userId }
            return res.status(200).json({status: 200, msg: 'Login Successful!', result });
        }
        return res.status(200).json({status: 204, msg: 'Login Failed!', result:{} });
    }catch(e){
        next(e);
    }
}

const logout = async (req, res, next) => {
    try{
        const { token } =  req.headers;
        let { data: { sessionid }} = jwt.verify(token, process.env.TOKEN);
        await db.query(`update session_trackers set isactive= false, deletedat= now() where sessionid='${sessionid}'`)
        return res.status(200).json({status: 200, msg: 'Login Failed!', result:{} });
    }catch(e){
        return res.status(200).json({status: 401, msg: 'Invalid Session!' });
    }
}

module.exports = { login, logout };