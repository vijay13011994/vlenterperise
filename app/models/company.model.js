const companies = (sequelize, DataTypes)=>{
    return sequelize.define('companies', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }        
      }, {
        timestamps: true
      });
}

module.exports = {companies};