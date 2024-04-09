const db = require("../models");

const createConvertation = async (req, res) => {
    try{         
        const { userId } = req.data;
        req.body.createdby = userId;
        await db.convertations.create(req.body);
        return res.status(200).json({status: 200, msg: 'Task created successfully'});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const getConvertationByContactId = async (req, res) => {
    try{                
        const { id } = req.params;
        const convertations = await db.convertations.findAll({where:{contact_id:id}});
        return res.status(200).json({status: 200, msg: 'convertations fetched successfully', convertations});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

module.exports = { createConvertation, getConvertationByContactId };