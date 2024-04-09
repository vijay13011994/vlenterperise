const trackings = (sequelize, DataTypes)=>{
    return sequelize.define('trackings', {
        
        shipment_remark: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        lrnum: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mwn: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cl_uuid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        package_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        expected_delivery_date: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        promised_delivery_date: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        timestamp: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }
           
      }, {
        timestamps: true
      });
}

module.exports = {trackings};