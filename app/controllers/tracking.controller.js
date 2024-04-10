const moment = require("moment");
const db = require("../models");
const { addTrackingSchema } = require("../schemas");

const createTracking = async (req, res) => {
    try{
        console.log(`createTracking api - ip = ${req.ip}, payload = ${JSON.stringify(req.body)}`);
        if(["::ffff:13.229.195.68", "::ffff:18.139.238.62", "::ffff:52.76.70.1", "::ffff:13.127.20.101", "::ffff:13.126.12.240", "::ffff:35.154.161.83", "::ffff:206.84.229.78"].includes(req.ip)){
            return res.status(401).json({status:401, msg:"Unautorized"});
        }
        const { error } = addTrackingSchema.validate(req.body);
        if(error){
            return res.status(400).json({status:400, msg:"Bad Request", error});
        }
        await db.trackings.create(req.body);
        return res.status(200).json({status:200, msg:"OK"});
    }catch(e){
        console.log(e);
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

const getTracking = async (req, res) => {
    try{
        const {lrnums} = req.body;
        const promArr = [];
        lrnums.forEach(lrnum => {
            promArr.push(db.trackings.findAll({where : {lrnum}}));
        });
        const result = await Promise.allSettled(promArr);
        const data = [];
        result.forEach(x=>{
            if(x.status === 'fulfilled'){
                data.push({
                    lrnum: x.value[0].lrnum,
                    status: x.value[0].status,
                    location: x.value[0].location,
                    wbns: x.value
                });
            }
        });
        return res.status(200).json({status:200, msg:"OK", data});
    }catch(e){
        console.log(e);
        return res.status(200).json({status: 500, msg: 'Internal Server Error' });
    }
}

module.exports = {createTracking, getTracking};