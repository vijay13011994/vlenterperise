const { addCustomerSchema } = require("../schemas");
const db = require("../models");

const getCustomer = async (req, res, next) => {
    try{
        const { companyId } = req.query;
        const result = await db.customers.findAndCountAll({ where:{ companyId }, order: [['updatedAt', 'DESC']]});
        return res.status(200).json({status: 200, msg: 'Customer Fetched!', result });
    }catch(e){
        next(e);
    }
}

const createCustomer = async(req, res, next) => {
    try{
        const { name, category, companyId } = req.body;
        const { error } = addCustomerSchema.validate(req.body);
        if(error){
            return res.status(200).json({status: 403, success: false, msg: error.details[0].message});
        }
        const [rows, created] = await db.customers.findOrCreate({where: { name, category, companyId }, defaults:req.body});
        let message = created?'Customer Created Successfully!':'Customer already Exist!';
        return res.status(200).json({status: 200, msg: message, result: { rows }});
    }catch(e){
        next(e);
    }
}

module.exports = { getCustomer, createCustomer };