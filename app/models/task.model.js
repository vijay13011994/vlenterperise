const tasks = (sequelize, DataTypes)=>{
    return sequelize.define('tasks', {
        leadid: {
            type: DataTypes.INTEGER
        },
        opportinityid: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'OPEN'
        },
        contactperson: {
            type: DataTypes.STRING,
            allowNull: false
        },
        remark:{
            type: DataTypes.STRING,
            allowNull: false
        },
        contactrole:{
            type: DataTypes.STRING
        },
        followupdate:{
            type: DataTypes.DATE,
            allowNull: false
        },
        createdby:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        updatedby:{
            type: DataTypes.INTEGER,
        },
        subject:{
            type: DataTypes.STRING
        },   
      }, {
        timestamps: true
      });
}

module.exports = {tasks};