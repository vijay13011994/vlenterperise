const convertations = (sequelize, DataTypes)=>{
    return sequelize.define('convertations', {
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contact_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdby:{
            type: DataTypes.INTEGER,
            allowNull: false
        }     
      }, {
        timestamps: true
      });
}

module.exports = {convertations};