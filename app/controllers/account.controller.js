const db = require("../models");

const createAccount = async (req, res) => {
    try{         
        const {userId} = req.data;
        req.body.createdby = userId;
        req.body.updatedby = userId;
        const result = await db.accounts.upsert(req.body);
        return res.status(200).json({status: 200, msg: `account ${result[0]['isNewRecord']?'created':'updated'} successfully`});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const getAccounts = async (req, res) => {
    try{         
        const {userId, isAdmin} = req.data;
        const condition = !isAdmin?`where ownerid = '${userId}'`:"";
        const [accounts] = await db.query(`select
            id,
            account_name,
            billing_address,
            shipping_address,
            cast(total_amount as varchar) total_amount,
            ownerid,
            "createdAt",
            "updatedAt"
        from
            accounts ${condition}`);
        return res.status(200).json({status: 200, msg: 'accounts fetched successfully', accounts});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const getAccountById = async (req, res) => {
    try{         
        const {id} = req.params;
        const account = await db.accounts.findOne({where:{id}});
        return res.status(200).json({status: 200, msg: 'accounts fetched successfully', account});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const deleteAccount = async (req, res) => {
    try{         
        const {id} = req.params;
        await db.accounts.destroy({where:{id}});
        return res.status(200).json({status: 200, msg: 'accounts deleted successfully'});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

module.exports = { createAccount, getAccounts, deleteAccount, getAccountById };