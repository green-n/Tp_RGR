const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const sleepData = require('./models/sleepData');
const sequelize = new Sequelize("crudbd", "root", "root", {
    host: 'localhost',
    dialect: 'mysql'
    });




const  User  = require('./models/user')(sequelize,Sequelize);
const SleepData  = require('./models/sleepData')(sequelize,Sequelize);
const Dreams = require('./models/dreams')(sequelize,Sequelize);
const DreamHelp = require('./models/dreamHelp')(sequelize,Sequelize);


User.hasMany(SleepData, {foreignKey: 'userId'});
User.hasMany(DreamHelp, {foreignKey: 'userId'});
SleepData.hasMany(Dreams, {foreignKey: 'sleepId'});

//get all dreams of user
async function get_all_dreams_of_user(userId){
    let dreams = await Dreams.findAll({
        where: {
            userId: userId
        }
    });
    return dreams;
}
//fill table sleepdata with data
async function fill_sleepdata_table(){
    SleepData.create({
        userId: 1,
        sleepTime: 7,
        wakeTime: 8,
        sleepQuality: 5,
        amountOfCicles: 3
    });
}
   

async function create_default_user(){
    User.create({
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
        email: 'joshDoe@mail.ru',
        password: '123456',
        gender: 0,
        rights:'user'
    });
}





app.get('/insertNewUser', async (req, res) => {
    res.send('insert');
    await create_default_user();
    
 
    
}
);

async function get_users_last_id(){
    
    temp = await User.findAll({raw:true})
    return temp[temp.length - 1].id
}

async function test(){
    tempUser = await User.findOne({where:{id:1}});
    console.log(await tempUser.getSleepData())
}

const get_all_users_json = async () => {
    let users = await User.findAll({raw:true});
    return JSON.parse(JSON.stringify(users));
}

async function get_all_sleepData_of_user(id){
    tempUser = await User.findOne({where:{id:id}});
    let data = await tempUser.getSleepData()
    return  await JSON.parse(JSON.stringify(data));
    
}

const returnGoodSleep = async (id) => {
    const sleepData = await get_all_sleepData_of_user(id);
    let temp =[]
    for(let i of sleepData){
        if(i.sleepQuality >= 7){
            temp.push(i)
        }
    }
    return temp;
}

const findUserById = async (id) => {
    let user = await User.findOne({where:{id:id}});
    return JSON.parse(JSON.stringify(user));

}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// app.get('/showAllUsers',(req,res) =>{
//     User.findAll({raw:true}).then(users => {res.send(users) 
//     console.log(users)
//     })

// })

app.get('/getUsersSleepData/:id', async (req, res) => {
    const id = req.params.id;
    const sleepData = await get_all_sleepData_of_user(id);
    //conver sleepData to array of objects
    //let sleepDataArray = JSON.parse(sleepData);
   // console.log(sleepDataArray[0].sleepTime + "test")
    console.log(sleepData[0])
    res.send(sleepData);
});

app.get('/getUsersGoodSleepData/:id', async (req, res) => {
    console.log(await returnGoodSleep(req.params.id))
    res.send(await returnGoodSleep(req.params.id));
});


app.get('/changeName/:id', async (req, res) => {

    const { id } = req.params;
    

    //get size of users
    //const lst_id = await get_users_last_id();
    

        
        User.update({firstName:'Nick'},{where: {id: id}}).then(() => {
            console.log('updated');
        }
        );
        User.findOne({where: {id: id}}).then(user => {
            user.update({lastName: 'Smith'})
        })

        res.send('update');

    }
  



    
    )

app.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    User.destroy({where: {id: id}}).then(() => {
        console.log('deleted');
    }
    );
    res.send('delete');
}
);

app.get('/getAllUsers', async (req, res) => {
    const users = await User.findAll({raw:true});
    res.send(users);
});

const db = require('./models');
//const { Json } = require('sequelize/types/utils');


// async function startServer(){
//    //await db.sequelize.sync();
//     app.listen(port, () => {
//         console.log(`Server is listening on port ${port}`);
//     });
// }

// for(let i = 5; i < 50; i++){
//     User.destroy({where: {id: i}})
// }

async function get_all_users(){
    return await User.findAll({raw:true})
}


    app.listen(port,async () => {
        db.sequelize.sync().catch(err => {
            console.log(err);
        });
        create_default_user();
        fill_sleepdata_table();
        //console.log(await get_all_users_json())
        console.log(await findUserById(1))
        //test();

        console.log(`Server is listening on port ${port}`);
    });

//export {startServer, get_all_users};
