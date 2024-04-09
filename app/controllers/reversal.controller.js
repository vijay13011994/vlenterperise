const db = require("../models");

const createReversal = async (req, res) => {
    try{
        const { userId} = req.data;
        if(req.body.id){
            req.body.updatedby = userId;
        }else{
            req.body.createdby = userId;
        }
        const result = await db.reversals.upsert(req.body);
        const [{isNewRecord}] = result;
        return res.status(200).json({status: 200, msg: `Reversal ${isNewRecord?"created":"updated"} successfully`});
    }catch(e){
        console.log(e);
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const getReversal = async (req, res) => {
    try{         
        const { userId, isAdmin} = req.data;
        const condition =!isAdmin?{where : {createdby: userId, status: 'initiated'}}:{where : {status: 'initiated'}};
        const reversals = await db.reversals.findAll(condition);
        return res.status(200).json({status: 200, msg: 'Reversals created successfully', reversals});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const getReversalById = async (req, res) => {
    try{         
        const {id} = req.params;
        const reversal = await db.reversals.findOne({where: {id}});
        return res.status(200).json({status: 200, msg: 'Reversal fetched successfully', reversal});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const deleteReversal = async (req, res) => {
    try{       
        const {id} = req.params  
        await db.reversals.destroy({where: {id}});
        return res.status(200).json({status: 200, msg: 'Reversal deleted successfully'});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

module.exports = { createReversal, getReversal, getReversalById, deleteReversal };