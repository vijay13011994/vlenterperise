const db = require("../models");
const { Op, Sequelize } = require("sequelize");

const createTask = async (req, res) => {
    try{         
        const {userId} = req.data;
        req.body.createdby = userId;
        req.body.updatedby = userId;
        await db.tasks.upsert(req.body)
        return res.status(200).json({status: 200, msg: 'Task created successfully'});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const getTask = async (req, res) => {
    try{       
        if(!Boolean(req.data.isAdmin)){
            req.query.createdby = req.data.userId;
        }
        if(req.query.type === 'MY TASK'){
            req.query.createdby = req.data.userId;
        }
        req.query.followupdate = req.query.toDate;
        delete req.query.companyId;
        delete req.query.toDate;
        delete req.query.type;
        delete req.query.userId;

        let query = `select
                        t.*,
                        l.firstname || l.lastname leadname,
                        o."name" oppname,
                        u."name" ownername
                    from
                        tasks t
                    left join leads l on
                        t.leadid = l.id
                    left join opportunities o on
                        t.opportinityid = o.id 
                    left join users u on
                        t.createdby = u.id
                    where t.followupdate >= 'NOW()'`;
        for(let x in req.query){
            if(req.query[x]){
                if(x!=='followupdate'){
                    query+= ` and t.${x} = '${req.query[x]}'`
                }else{
                    query+= ` and t.${x} <= '${req.query[x]}'`
                }
            }
        }
        const [rows] = await db.query(query);
        return res.status(200).json({status: 200, msg: 'tasks fetched successfully', tasks: rows});
    }catch(e){
        console.log(e)
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const deleteTask = async (req, res) => {
    try{
        const {id} = req.params;
        await db.tasks.destroy({where: {id}});
        return res.status(200).json({status: 200, msg: 'Task Delted Successfully!' });
    }catch(e){
        console.log(e);
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}
module.exports = { createTask, getTask, deleteTask };