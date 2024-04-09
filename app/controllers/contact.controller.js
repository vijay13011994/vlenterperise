const db = require("../models");

const createContact = async (req, res) => {
    try{         
        const result = await db.contacts.upsert(req.body);
        return res.status(200).json({status: 200, msg: `Contacts ${result[0]['isNewRecord']?'created':'updated'} successfully`});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const getContacts = async (req, res) => {
    try{         
        const contacts = await db.contacts.findAll();
        return res.status(200).json({status: 200, msg: 'Contacts fetched successfully', contacts});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const getContactById = async (req, res) => {
    try{         
        const {id} = req.params;
        const contact = await db.contacts.findOne({where: {id}});
        return res.status(200).json({status: 200, msg: 'Contacts fetched successfully', contact:contact.toJSON()});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const getContactsByAccountId = async (req, res) => {
    try{         
        const {id} = req.params;
        const contacts = await db.contacts.findAll({where:{account_id: id}});
        return res.status(200).json({status: 200, msg: 'Contacts fetched successfully', contacts});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const deleteContact = async (req, res) => {
    try{         
        const {id} = req.params;
        await db.contacts.destroy({where:{id}});
        return res.status(200).json({status: 200, msg: 'Contacts deleted successfully'});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

module.exports = { createContact, getContacts, deleteContact, getContactsByAccountId, getContactById };