const db = require("../models");

const createProduct = async (req, res) => {
    try{         
        const {userId} = req.data;
        req.body.createdby = userId;
        req.body.updatedby = userId;
        const result = await db.products.upsert(req.body);
        return res.status(200).json({status: 200, msg: `products ${result[0]['isNewRecord']?'created':'updated'} successfully`});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const getProducts = async (req, res) => {
    try{         
        const [products] = await db.query(`select
            id,
            "name",
            cast(mrp as varchar) mrp,
            category,
            sku,
            createdby,
            updatedby,
            "createdAt",
            "updatedAt"
        from
            products`);
        return res.status(200).json({status: 200, msg: 'products fetched successfully', products});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const getProductById = async (req, res) => {
    try{     
        const {id} = req.params;  
        const product = await db.products.findOne({where:{id}});
        return res.status(200).json({status: 200, msg: 'product fetched successfully', product});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const deleteProduct = async (req, res) => {
    try{         
        const {id} = req.params;
        await db.products.destroy({where:{id}});
        return res.status(200).json({status: 200, msg: 'products deleted successfully'});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

module.exports = { createProduct, getProducts, deleteProduct, getProductById };