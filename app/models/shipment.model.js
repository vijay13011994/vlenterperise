const shipments = (sequelize, DataTypes)=>{
    return sequelize.define('shipments', {
        "article_number": {
          type: DataTypes.STRING,
          allowNull: false
        },
        "furniture": {
            type: DataTypes.STRING,
            allowNull: false
        },
        "quantity": {
            type: DataTypes.STRING,
            allowNull: false
        },
        "box": {
            type: DataTypes.STRING,
            allowNull: false
        },
        "so_no": {
            type: DataTypes.STRING,
            allowNull: false
        },
        "invoice_number": {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }, 
        "lr_no": {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        "weight": {
            type: DataTypes.STRING,
            allowNull: false
        },
        "length": {
            type: DataTypes.STRING,
            allowNull: false
        },
        "width": {
            type: DataTypes.STRING,
            allowNull: false
        },
        "height": {
            type: DataTypes.STRING,
            allowNull: false
        },
        "consine_name": {
            type: DataTypes.STRING,
            allowNull: false
        },
        "pickup_address": {
            type: DataTypes.STRING,
            allowNull: false
        },
        "consine_address": {
            type: DataTypes.STRING,
            allowNull: false
        },
        "value": {
            type: DataTypes.STRING,
            allowNull: false
        },
        "city": {
            type: DataTypes.STRING,
            allowNull: false
        },
        "mobile_number": {
            type: DataTypes.STRING,
            allowNull: false
        },
        "pincode": {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        "party_state": {
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

module.exports = {shipments};