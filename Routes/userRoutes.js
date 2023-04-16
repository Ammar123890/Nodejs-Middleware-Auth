
const { signup, login,addArticle,
    deleteArticle,
    updateArticle,
    updateArticleStatus,
    getArticles,getUnpublishedArticles } = require("../Controller/UserController");
const User = require("../Models/User")
const jwt = require('jsonwebtoken');

const userRoter = require("express").Router();

userRoter.post("/signup" , signup)
userRoter.post('/login' , login)


let verifyToken = (req,res,next)=>{
    let token = req.headers["token"];
    if(!token){
        res.status(400).send({message:"No token provided"})
    }else{
        jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
            if(err){
                res.status(400).send({message:"Failed to authenticate token"})
            }else{
                req.decoded = decoded;
                next();
            }
        })
    }
}

let checkAdmin = (req,res,next)=>{
    if(req.decoded.role == "admin"){
        next();
    }else{
        res.status(400).send({message:"You are not an admin"})
    }
}

userRoter.get("/",verifyToken,checkAdmin,(req,res)=>{
    res.send({message: "Welcome to the user router ( A secret to protect)"})
})


userRoter.post("/add",verifyToken,(req,res)=>{
    addArticle(req,res);
})

userRoter.delete("/delete/:id",verifyToken,(req,res)=>{
    deleteArticle(req,res);
})

userRoter.put("/update/:id",verifyToken,(req,res)=>{
    updateArticle(req,res);
})

userRoter.put("/update/:id/status",verifyToken,checkAdmin,(req,res)=>{
    updateArticleStatus(req,res);
})

userRoter.get("/articles",verifyToken,(req,res)=>{
    getArticles(req,res);
})

userRoter.get("/articles/unpublished",verifyToken,(req,res)=>{
    getUnpublishedArticles(req,res);
})

module.exports = userRoter;
