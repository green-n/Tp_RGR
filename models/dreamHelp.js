module.exports = (sequelize, DataTypes) => {
    const DreamHelp = sequelize.define('dreamHelp', {
        userId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:'Users',
                key:'id'
            },
            validate : {
                notEmpty: true
            }

        },
        meditation:{
            type:DataTypes.INTEGER,
            allowNull:true,
           
        },
        streching:{
            type:DataTypes.INTEGER,
            allowNull:true,
           
        },
        exercise:{
            type:DataTypes.INTEGER,
            allowNull:true,
           
        },
        daySleep:{
            type:DataTypes.INTEGER,
            allowNull:true,
           
        },
        phoneUsageBeforeSleep:{
            type:DataTypes.INTEGER,
            allowNull:true,
        
        },
        phoneUsageAfterSleep:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        dreamJornal:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
       
    });
    return DreamHelp;
}


