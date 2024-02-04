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



app.get("/users",async (req, res)=>{

    try {
        await dataSource.initialize();
        let users =  dataSource.getRepository('users');
        users = await users.find();
        res.send(users);

    } catch (error) {
        res.send(error);
    }


});


app.get("/user/:name/:email",async (req, res)=>{

    try {
        await dataSource.initialize();
        let users =  dataSource.getRepository('users');
        let user = req.params;
    
        let u = await users.save(user);

        res.send(u);

    } catch (error) {
        res.send(error);
    }




})