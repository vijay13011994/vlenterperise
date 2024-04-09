const db = require("../models");

const createLead = async (req, res) => {
    try{   
        const { userId, name } = req.data;
        req.body.createdby = userId;
        req.body.updatedby = userId;

        if(req.body.id && req.body.status === 'CONVERTED'){
            const {id} = await db.accounts.create({
                account_name: req.body.companyname,
                billing_address: req.body.billingaddress,
                shipping_address: req.body.shippingaddress,
                ownerid: userId
            });
            await db.contacts.create({
                first_name: req.body.firstname,
                last_name: req.body.lastname,
                phone_number: req.body.mobileno?req.body.mobileno:"",
                email: req.body.email?req.body.email:"",
                company_name: req.body.companyname?req.body.companyname:"",
                role: "ADMIN",
                lead_id:req.body.id,
                account_id: id
            });
            await db.opportunities.create({
                name: `${req.body.companyname}-${req.body.firstname} ${req.body.lastname}`,
                description:'',
                lead_id:req.body.id,
                updatedby: userId,
                createdby: userId,
                status: 'INPROGRESS',
                account_id: id
            });    
        }
        const [{isNewRecord}] = await db.leads.upsert(req.body);
        console.log(isNewRecord);
        return res.status(200).json({status: 200, msg: `Lead ${isNewRecord?'created':'edited'} successfully`});
    }catch(e){
        console.log(e);
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const getLeads = async (req, res) => {
    try{         
        const { userId, name, isAdmin } = req.data;
        const condition = !isAdmin?`where ownerid = '${userId}'`:"";
        const [leads] = await db.query(`select
            id,
            firstname || ' ' || lastname name,
            source,
            companyname,
            billingaddress,
            status,
            to_char("createdAt", 'YYYY-MM-DD') "createdAt",
            to_char("updatedAt", 'YYYY-MM-DD') "updatedAt"
        from
            leads l ${condition}`);
        return res.status(200).json({status: 200, msg: 'Lead fetched successfully', leads});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const getLeadById = async (req, res) => {
    try{
        const {id} = req.params;
        const lead = await db.leads.findOne({where: {id}})
        return res.status(200).json({status: 200, msg: 'Lead Data Found!', lead });
    }catch(e){
        console.log(e);
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const getLeadByUserId = async (req, res) => {
    try{
        const {ownerid} = req.params;
        const leads = await db.leads.findAll({where: {ownerid}})
        return res.status(200).json({status: 200, msg: 'Lead Data Found!', leads });
    }catch(e){
        console.log(e);
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const deleteLead = async (req, res) => {
    try{
        const {id} = req.params;
        const lead = await db.leads.destroy({where: {id}});
        return res.status(200).json({status: 200, msg: 'Lead Delted Successfully!' });
    }catch(e){
        console.log(e);
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const getUnassignedLeads = async (req, res) => {
    try{     
        const leads = await db.leads.findAll({
            where: {ownerid: -1}
        });
        return res.status(200).json({status: 200, msg: 'Lead fetched successfully', leads});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}


const updateUnassignedLead = async (req, res) => {
    try{   
        const { userId } = req.data;
        await db.query(`update leads set ownerid = ${userId} where id = ${req.params.id}`)
        return res.status(200).json({status: 200, msg: 'Lead updated successfully'});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

module.exports = { createLead, getLeads, getLeadById, getLeadByUserId, deleteLead, getUnassignedLeads, updateUnassignedLead };