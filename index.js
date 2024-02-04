const express = require("express");
var typeorm = require("typeorm");

const User = require("./models/User");

const dataSource = new typeorm.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "test",
    synchronize: false,
    logging:true,
    entities: [User],
})




const app = express();
app.listen(3400);


app.get("/users/:id",async (req, res)=>{

    try {
        await dataSource.initialize();
        let users =  dataSource.getRepository('users');
        let user = await users.find({where:{id:req.params.id}});
        console.log(user);
        await  dataSource.destroy();
        res.send(user);

    } catch (error) {
        res.send(error);
    }


});

app.get("/users",async (req, res)=>{

    try {
        await dataSource.initialize();
        let users =  dataSource.getRepository('users');
        users = await users.find();
        console.log(users);
        await  dataSource.destroy();
        res.send(users);
       

    } catch (error) {
        res.send(error);
    }


});


app.get("/users/:name/:email",async (req, res)=>{

    try {
        await dataSource.initialize();
        let users =  dataSource.getRepository('users');
        let user = req.params;
    
        let u = await users.save(user);
        await  dataSource.destroy();
        res.send(u);

    } catch (error) {
        res.send(error);
    }




})