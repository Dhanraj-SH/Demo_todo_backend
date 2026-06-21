const express = require("express");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("./middleware");

const app = express();
app.use(express.json());

const USER_ID = 1;
const TODO_ID = 1;

const USERS = [];
const TODOS = [];

app.post("/signup", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const userExists = USERS.find(user => user.username === username);

    if(userExists){
        return res.status(403).json({
            message: "User username already exists"
        });
    }

    USERS.push({
        id: USER_ID++,
        username: username,
        password: password
    });

    res.json({
        message: USER_ID - 1
    })
});

app.post("/signin", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const userExists = USERS.find(u => u.username === username && u.password === password);

    if(!userExists){
        return res.status(403).json({
            message: "User have not signed up"
        });
    }

    const token = json.sign({userId: userExists.id}, "token");

    res.json({
        token: token
    });

});

app.post("/todo", authMiddleware, (req,res)=>{
    const userId = req.userId;
    const title = req.body.title;
    const description = req.body.description;

    TODOS.push({
        id: TODO_ID++,
        title: title,
        description: description
    });

    res.json({
        message: "Todo made"
    });
});

app.delete("/todo", authMiddleware, (req,res)=>{
    
});

app.get("/todos", authMiddleware, (req, res)=>{
    
});

app.listen(3000);
