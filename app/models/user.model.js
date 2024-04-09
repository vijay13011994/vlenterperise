const users = (sequelize, DataTypes)=>{
    return sequelize.define('user', {
        name: {
            type: DataTypes.STRING
        },
        contact: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN
        },
        userId:{
            type: DataTypes.INTEGER
        },
        companyId:{
            type: DataTypes.INTEGER
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }        
      }, {
        timestamps: true
      });
}

module.exports = {users};