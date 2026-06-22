const express = require("express");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("./middleware");
const {userModel, todoModel} = require("./models");

const app = express();
app.use(express.json());

// let USER_ID = 1;
// let TODO_ID = 1;

// let USERS = [];
// let TODOS = [];

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

    const token = jwt.sign({
        userId: userExists.id
    }, "token");

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
        description: description,
        userId: userId
    });

    res.json({
        message: "Todo made"
    });
});

app.delete("/todo/:todoId", authMiddleware, (req,res)=>{
    const userId = req.userId;
    const todoId = parseInt(req.params.todoId);

    const ownsTodo = TODOS.find(todo => todo.id === todoId && todo.userId === userId);

    if(ownsTodo){
        TODOS = TODOS.filter(t => t.id !== todoId);
        return res.json({
            message: "Deleted"
        });
    }else{
        return res.status(411).json({
            message: "Either todo doesnt exist or this is not your todo"
        });
    }

});

app.get("/todos", authMiddleware, (req, res)=>{
    const userId = req.userId;
    const todosList = TODOS.filter(t => t.userId === userId );
    res.json({
        todos: todosList
    });
});

app.listen(3000);
