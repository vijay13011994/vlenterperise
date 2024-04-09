const productmappings = (sequelize, DataTypes)=>{
    return sequelize.define('productmapping', {
        opportinity_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        mrp: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        discount: {
          type: DataTypes.INTEGER,
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

module.exports = {productmappings};