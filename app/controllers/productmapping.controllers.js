const db = require("../models");

const mapProduct = async (req, res) => {
    try{
        const {userId} = req.data;
        req.body.createdby = userId;
        req.body.updatedby = userId;
        await db.productmappings.upsert(req.body);
        return res.status(200).json({status: 200, msg: 'Product mapped successfully'});
    }catch(e){
        console.log(e);
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const getMappedProducts = async (req, res) => {
    try{         
        const mappedProducts = await db.productmappings.findAll();
        return res.status(200).json({status: 200, msg: 'mapped product fetched successfully', mappedProducts});
    }catch(e){
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const getMappedProductsByOppId = async (req, res) => {
    try{         
        const {id} = req.params;
        const [mappedProducts] = await db.query(`select
                                p.id,
                                p2."name" productname,
                                p2.mrp ,
                                p.quantity,
                                p.discount,
                                p2.sku
                            from
                                productmappings p ,
                                opportunities o,
                                products p2
                            where
                                p.opportinity_id = o.id
                                and opportinity_id = ${id}
                                and p.product_id = p2.id `);
        return res.status(200).json({status: 200, msg: 'mapped product fetched successfully', mappedProducts});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const deleteMappedProduct = async (req, res) => {
    try{  
        const {id} = req.params;      
        const mappedProducts = await db.productmappings.destroy({where: {id}});
        return res.status(200).json({status: 200, msg: 'product unmapped successfully'});
    }catch(e){
        console.log(e);
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const updateMappedProduct = async (req, res) => {
    try{  
        const {id} = req.params;    
        console.log(req.body);
        const {key, value} = req.body;  
        console.log(`update productmappings set ${key} = '${value}' where id = ${id}`);
        const [ rows, {rowCount}] = await db.query(`update productmappings set ${key} = '${value}' where id = ${id}`);
        return res.status(200).json({status: 200, msg: rowCount>0?'successful':'error'});
    }catch(e){
        console.log(e);
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

module.exports = { mapProduct, getMappedProducts, getMappedProductsByOppId, deleteMappedProduct, updateMappedProduct };