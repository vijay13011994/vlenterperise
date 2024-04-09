const db = require("../models");

const createOppourtinity = async (req, res) => {
    try{     
        const { userId } = req.data;
        if(!req.body.id) req.body.createdby = userId;
        req.body.updatedby = userId;
        req.body.owner_id = userId;

        if(req.body.status ==='TYSCB'){
            const [[{amount}]] = await db.query(`select sum(quantity*mrp - discount) amount from productmappings p where opportinity_id=${req.body.id}`);
            if(amount){
                await db.query(`update accounts set total_amount=total_amount+${amount} where id = ${req.body.account_id}`)
            }
        }
        const result = await db.opportunities.upsert(req.body);
        return res.status(200).json({status: 200, msg: `Oppourtinity ${result[0].isNewRecord?"created":"updated"} successfully`});
    }catch(e){
        console.log(e);
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const getOppourtinities = async (req, res) => {
    try{         
        const {account_id} = req.query;
        const { userId, isAdmin } = req.data;
        const query = `select o.id, firstname||' '||lastname leadname, source, companyname, o.status, o.name, 
        o.description, u."name" ownername from leads l ,opportunities o, users u
         where o.lead_id =l.id and l.ownerid = u.id ${!isAdmin?'and l.ownerid='+userId:''} 
         ${account_id?'and account_id='+account_id:''}`;
        const [opportunities] = await db.query(query);
        return res.status(200).json({status: 200, msg: 'Oppourtinities fetched successfully', opportunities});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const getOppourtinityById = async (req, res) => {
    try{         
        const {id} = req.params;
        const opportunity = await db.opportunities.findOne({where:{id}});
        return res.status(200).json({status: 200, msg: 'Oppourtinities fetched successfully', opportunity});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const deleteOppourtinities = async (req, res) => {
    try{         
        const {id} = req.params;
        const opportunities = await db.opportunities.destroy({where:{id}});
        return res.status(200).json({status: 200, msg: 'Oppourtinities deleted successfully'});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const getOpportinityByAccountId = async (req, res) => {
    try{         
        const {id} = req.params;
        const opportunities = await db.opportunities.findAll({where:{account_id: id}});
        return res.status(200).json({status: 200, msg: 'Oppourtinities fetched successfully', opportunities});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

module.exports = { createOppourtinity, getOppourtinities, getOppourtinityById, deleteOppourtinities, getOpportinityByAccountId };