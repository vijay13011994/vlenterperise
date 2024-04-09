const db = require("../models");
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
    try{
        const { username, password } = req.body;
        let data = await db.users.findOne({ where: { username, password } });
        console.log(data)
        if(data){
            const { id: userId, companyId, isAdmin } = data.toJSON();
            const token = jwt.sign({ data: {userId, companyId, isAdmin}}, process.env.TOKEN, { expiresIn: 60 * 60 * 6});
            const result = { token, isAdmin }
            return res.status(200).json({status: 200, msg: 'Login Successful!', result });
        }
        return res.status(200).json({status: 204, msg: 'Login Failed!', result:{} });
    }catch(e){
        next(e);
    }
}

const isSessionValid = async (req, res, next) => {
    try{
        const { token } =  req.headers;
        let { data: { sessionid }} = jwt.verify(token, process.env.TOKEN);
        const data = await db.session_tracker.findOne({ where: { ip: req.ip, sessionid, isactive: true} });
        if(!data){
            return res.status(200).json({status: 401, msg: 'unauthorized!' });
        }
        return res.status(200).json({status: 200, msg: 'Login Failed!', result:{} });
    }catch(e){
        console.log(e);
        return res.status(200).json({status: 401, msg: 'Invalid Session!' });
    }
}

const logout = async (req, res, next) => {
    try{
        const { token } =  req.headers;
        let { data: { sessionid }} = jwt.verify(token, process.env.TOKEN);
        await db.query(`update session_trackers set isactive= false, deletedat= now() where sessionid='${sessionid}'`)
        return res.status(200).json({status: 200, msg: 'Login Failed!', result:{} });
    }catch(e){
        console.log(e);
        return res.status(200).json({status: 401, msg: 'Invalid Session!' });
    }
}

const createUser = async (req, res) => {
    try{
        const data ={
            ...req.body,
            username: req.body.name.split(" ")[0],
            password: req.body.name.split(" ")[0]+req.body.contact.substring(0,5),
            isAdmin: false,
            companyId: 3
        }
        const result = await db.users.upsert(data);
        const [{isNewRecord}] = result;
        return res.status(200).json({status: 200, msg: `User ${isNewRecord?"created":"updated"} successfully`});
    }catch(e){
        console.log(e);
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const getUser = async (req, res) => {
    try{         
        const users = await db.users.findAll({where: {companyId:3, isAdmin: false}});
        return res.status(200).json({status: 200, msg: 'User created successfully', users});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const getUserById = async (req, res) => {
    try{         
        const {id} = req.params  
        const user = await db.users.findOne({where: {id}});
        return res.status(200).json({status: 200, msg: 'User fetched successfully', user});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const deleteUser = async (req, res) => {
    try{       
        const {id} = req.params  
        await db.users.destroy({where: {id}});
        return res.status(200).json({status: 200, msg: 'User deleted successfully'});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const changePassword = async (req, res) => {
    try{ 
        const {userId} = req.data;        
        const {old_password, new_password} = req.body;
        const result = await db.query(`update users set password = '${new_password}' where id ='${userId}' and password='${old_password}'`);
        if(result[1].rowCount === 0){
            return res.status(200).json({status: 200, msg: 'please provide valid data!'});
        }
        return res.status(200).json({status: 200, msg: 'password changes successfully!'});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const getDashboardData = async (req, res) => {
    try{ 
        const {userId, isAdmin} = req.data;
        const [[{lead_count}]] = await db.query(`select count(1) lead_count from leads l ${!isAdmin?` where ownerid = '${userId}'`:''}`);
        const [[{sales}]] = await db.query(`select sum(total_amount) sales from accounts a  ${!isAdmin?` where ownerid = '${userId}'`:''}`);
        const [[{opportunity_count}]] = await db.query(`select count(1) opportunity_count from opportunities o  ${!isAdmin?` where owner_id = '${userId}'`:''}`);
        const [[{product_count}]] = await db.query(`select count(1) product_count from products p`);
        const data = [
            {label: 'Lead Count', count: lead_count},
            {label: 'Sales', count: sales},
            {label: 'Opportunities Count', count: opportunity_count},
            {label: 'Product Count', count: product_count}
        ]
        return res.status(200).json({status: 200, msg: 'data fetched successfully!', data});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}


module.exports = { login, isSessionValid, logout, createUser, getUser, getUserById, deleteUser, changePassword, getDashboardData };