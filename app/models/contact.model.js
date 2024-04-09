exports.contacts = (sequelize, DataTypes)=>{
    return sequelize.define('contacts', {
        first_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        phone_number:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        company_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        role:{
            type: DataTypes.STRING
        },
        lead_id:{
            type: DataTypes.INTEGER
        },
        account_id:{
            type: DataTypes.INTEGER
        }
    })
}