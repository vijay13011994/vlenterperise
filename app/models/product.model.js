const products = (sequelize, DataTypes)=>{
    return sequelize.define('product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mrp: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false
        },
        sku: {
          type: DataTypes.STRING,
          allowNull: false
        },
        createdby:{
          type: DataTypes.INTEGER,
          allowNull: false
        },
        updatedby:{
            type: DataTypes.INTEGER,
            allowNull: false
        },  
      }, {
        timestamps: true
      });
}

module.exports = {products};