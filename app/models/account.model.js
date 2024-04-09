exports.accounts = (sequelize, DataTypes)=>{
    return sequelize.define('accounts', {
        account_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        billing_address:{
            type: DataTypes.STRING,
            allowNull: false
        },
        shipping_address:{
            type: DataTypes.STRING,
            allowNull: false
        },
        total_amount:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        ownerid:{
            type: DataTypes.INTEGER
        }
        
    }, {
        timestamps: true
      })
}