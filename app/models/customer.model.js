const  customers = (sequelize, DataTypes)=>{
    return sequelize.define('customer', {
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING
        },
        balance: {
            type: DataTypes.INTEGER
        },
        isDeleted:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        userId:{
            type: DataTypes.INTEGER
        },
        companyId:{
            type: DataTypes.INTEGER
        }
      }, {
        timestamps: true
      });
}

module.exports = { customers};