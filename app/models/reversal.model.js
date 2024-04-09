const reversals = (sequelize, DataTypes)=>{
    return sequelize.define('reversals', {
        "cc_no": {
          type: DataTypes.STRING,
          allowNull: false
        },
        "customer_name": {
            type: DataTypes.STRING,
            allowNull: false
        },
        "pickup_address": {
            type: DataTypes.STRING,
            allowNull: false
        },
        "delivery_address": {
            type: DataTypes.STRING,
            allowNull: false
        },
        "product_name": {
            type: DataTypes.STRING,
            allowNull: false
        },
        "contact_no": {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        "weight": {
            type: DataTypes.STRING,
            allowNull: false
        },
        "amount": {
            type: DataTypes.STRING,
            allowNull: false
        },
        "nop": {
            type: DataTypes.STRING,
            allowNull: false
        },
        "hsn_code": {
            type: DataTypes.STRING,
            allowNull: false
        },
        "status": {
            type: DataTypes.STRING,
        }, 
        "createdby": {
            type: DataTypes.INTEGER,
        }, 
        "updatedby": {
            type: DataTypes.INTEGER,
        }
      }, {
        timestamps: true
      });
}

module.exports = {reversals};