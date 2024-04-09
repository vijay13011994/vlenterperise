const db = require("../models");

const createShipment = async (req, res) => {
    try{
        const { userId} = req.data;
        if(req.body.id){
            req.body.updatedby = userId;
        }else{
            req.body.createdby = userId;
        }
        const result = await db.shipments.upsert(req.body);
        const [{isNewRecord}] = result;
        return res.status(200).json({status: 200, msg: `Shipment ${isNewRecord?"created":"updated"} successfully`});
    }catch(e){
        console.log(e);
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const getShipment = async (req, res) => {
    try{         
        const { userId, isAdmin} = req.data;
        const shipments = await db.shipments.findAll(!isAdmin?{where : {createdby: userId, status:'initiated'}}:{where : {status:'initiated'}});
        return res.status(200).json({status: 200, msg: 'Shipments created successfully', shipments});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const getShipmentById = async (req, res) => {
    try{         
        const {id} = req.params;
        const shipment = await db.shipments.findOne({where: {id}});
        return res.status(200).json({status: 200, msg: 'Shipment fetched successfully', shipment});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const deleteShipment = async (req, res) => {
    try{       
        const {id} = req.params  
        await db.shipments.destroy({where: {id}});
        return res.status(200).json({status: 200, msg: 'Shipment deleted successfully'});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

module.exports = { createShipment, getShipment, getShipmentById, deleteShipment };