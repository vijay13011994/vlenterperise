const { addTransactionSchema } = require("../schemas");
const db = require("../models");

const getTransactions = async (req, res, next) => {
    try{
        const { createdAt, type, companyId } = req.query;
        let str = '';
        str += createdAt?` where "createdAt"::DATE = '${createdAt}'::DATE`:` where "createdAt"::DATE = CURRENT_DATE::DATE`;
        str += type? ` and "type" ='${type}'`:'';
        const [ rows ] = await db.query(`select
                                            *,
                                            (
                                            select
                                                t."name"
                                            from
                                                orders o ,
                                                "tables" t
                                            where
                                                o."tableId" = t.id
                                                and "orderId" = t1."orderId"
                                            limit 1)
                                        from
                                            transactions t1 ${str} and t1."companyId"=${companyId} order by t1."orderId"`);
        const [ count ] = await db.query(`select sum(amount) total FROM transactions t ${str} and t."companyId"=${companyId}`);
        return res.status(200).json({ status:200, msg: 'Transactions Fetched!', result: { count, rows }});
    }catch(e){
        next(e);
    }
}

const createTransaction = async(req, res, next) => {
    try{
        const { error } = addTransactionSchema.validate(req.body);
        if(error){
            return res.status(200).json({status: 200, msg: error.details[0].message, result:{} });
        }
        const {orderId, amount, netAmount, customerId, tableId, paidAmount, discountAmount, mode, userId, companyId } = req.body;
        let message = '';
        db.transaction(async (transaction) => {
            try{
                if(paidAmount > 0){
                    await db.transactions.create({ orderId, amount: parseInt(paidAmount), type:'paid', mode, customerId, userId, companyId }, {transaction});
                    await db.transactions.create({ orderId, amount: parseInt(netAmount - discountAmount - paidAmount), type:'credit', mode,  customerId, userId, companyId }, {transaction});
                    await db.customers.increment('balance', { by: parseInt(netAmount - discountAmount - paidAmount), where: { id: customerId, companyId } }, {transaction});
                }else{
                    await db.transactions.create({ orderId, amount: parseInt(amount), type:'pay', mode, customerId, userId, companyId }, {transaction});
                }
                if(discountAmount > 0){
                    await db.transactions.create({ orderId, amount: parseInt(discountAmount), type:'discount', mode, customerId, userId, companyId }, {transaction});
                }
                await db.tables.update({isOccupied: false}, { where: {id: tableId, companyId }}, {transaction});
                await db.query(`update orders set "checkOutAt"=now() where "tableId"=${tableId} and "companyId"=${companyId} and "checkOutAt" is null`, {transaction});
                // await transaction.commit();
                message = 'Transaction Done Successfully!';
            }catch(e){
                await transaction.rollback();
                throw new Error('Transaction Error!');
            }
        });
        return res.status(200).json({status: 200, msg: message, result: {} });
    }catch(e){
        next(e);
    }
}


const getTransactionsTableWise = async (req, res, next) => {
    try{
        const { createdAt, type, companyId } = req.query;
        const queryStr =`select
                            x.name,
                            sum(x.amount)
                        from
                            (
                            select
                                t.amount,
                                (
                                select
                                    t2."name"
                                from
                                    orders o,
                                    "tables" t2
                                where
                                    o."tableId" = t2.id
                                and o."orderId" = t."orderId"
                                limit 1)
                            from
                                transactions t where DATE(t."createdAt")='${createdAt}'::DATE and t.type='${type}' and t."companyId"=${companyId}) x group by x.name`;
            const [ rows ] = await db.query(queryStr);
            res.status(200).json({status: 200, msg: 'Retrived', result:{rows}});
    }catch(e){
        next(e);
    }
}

module.exports = { getTransactions, createTransaction, getTransactionsTableWise };