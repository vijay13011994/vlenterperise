const opportunities = (sequelize, DataTypes)=>{
    return sequelize.define('opportunities', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'INPROGRESS'
        },
        lead_id: {
            type: DataTypes.INTEGER
        },
        account_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        owner_id: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdby:{
            type: DataTypes.INTEGER
        },
        updatedby:{
            type: DataTypes.INTEGER,
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

module.exports = {opportunities};