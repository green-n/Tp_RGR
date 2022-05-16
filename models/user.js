module.exports=(sequelize,DataTypes)=>{
    const User=sequelize.define('User',{
        firstName:{
            type:DataTypes.STRING,
            allowNull:false,
            validate : {
                notEmpty: true
            }
        },
        lastName:{
            type:DataTypes.STRING,
            allowNull:false,
            validate : {
                notEmpty: true
            }
        },
        age:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate : {
                notEmpty: true
            }

        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            validate : {
                notEmpty: true
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate : {
                notEmpty: true
            }
        },
        gender:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        rights:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        }
    }); 
   
    return User;
}
