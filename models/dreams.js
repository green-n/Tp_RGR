module.exports = (sequelize, DataTypes) => {
    const Dreams = sequelize.define('Dreams', {
        dreamName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        dreamDescription: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        
        sleepId: {
            type: DataTypes.INTEGER,
            //conect to sleepData
            references:{
                model:'SleepData',
                key:'id'
            },
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    });
    return Dreams;
}