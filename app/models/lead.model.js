const leads = (sequelize, DataTypes)=>{
    return sequelize.define('lead', {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        source: {
            type: DataTypes.STRING,
            allowNull: false
        },
        companyname:{
            type: DataTypes.STRING,
            allowNull: false
        },
        billingaddress:{
            type: DataTypes.STRING,
            allowNull: false
        },
        shippingaddress:{
            type: DataTypes.STRING,
            allowNull: false
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false
        },
        intrestedon:{
            type: DataTypes.STRING,
            allowNull: false
        },
        status:{
            type: DataTypes.STRING,
            allowNull: false
        },
        ownerid:{
            type: DataTypes.INTEGER
        },
        scoring:{
            type: DataTypes.INTEGER
        },
        quality:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mobileno: {
            type: DataTypes.STRING
        },
        createdby:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        updatedby:{
            type: DataTypes.INTEGER
        }
      }, {
        timestamps: true
      });
}

module.exports = {leads};