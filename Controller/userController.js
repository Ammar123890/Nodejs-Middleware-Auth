const User = require("../Models/User");
const Article = require("../Models/Article");
const jwt = require("jsonwebtoken")

let signup = (req , res)=>{
    let {username,password,name,role} = req.body;
    console.log(username,password,name)
    let user = new User({
        username:username,
        password:password,
        name:name,
        role:role
    })
    user.save().then((user)=>{
        res.status(200).send({message:"Successfully added",user:user})
    }).catch((err)=>{
        res.status(400).send({message:"Error, Not added successfully",err:err})
    })
}

let login = (req,res)=>{
    let {username,password} = req.body;
    console.log(username,password)
    User.findOne({username:username}).then((user)=>{
        if(user){
            if(user.password == password){
                let token = jwt.sign({id:user._id,role:user.role},process.env.SECRET_KEY,{expiresIn:"24h"})
                res.status(200).send({message:"Successfully Logged in",user:user,token:token})
            }else{
                res.status(400).send({message:"Wrong Password"})
            }
        }else{  
            res.status(400).send({message:"User not found"})
        }
    }).catch((err)=>{   
        res.status(400).send({message:"Error",err:err})
    })
}

let addArticle = (req,res)=>{
    let {title,body,author,tags} = req.body;
    let article = new Article({
        title:title,
        body:body,
        author:author,
        tags:tags
    })
    article.save().then((article)=>{
        res.status(200).send({message:"Successfully added",article:article})
    }).catch((err)=>{
        res.status(400).send({message:"Error, Not added successfully",err:err})
    })

}

let deleteArticle = (req,res)=>{
    let {id} = req.params;  
    Article.findByIdAndDelete(id).then((article)=>{
        res.status(200).send({message:"Successfully deleted",article:article})
    }).catch((err)=>{
        res.status(400).send({message:"Error, Not deleted successfully",err:err})
    })
}

let updateArticle = (req,res)=>{
    let {id} = req.params;
    let {title,body,author,tags} = req.body;
    Article.findByIdAndUpdate(id,{title:title,body:body,author:author,tags:tags}).then((article)=>{
        res.status(200).send({message:"Successfully updated",article:article})
    }).catch((err)=>{
        res.status(400).send({message:"Error, Not updated successfully",err:err})
    })
}

let updateArticleStatus = (req,res)=>{
    let {id} = req.params;
    let {title,body,author,tags} = req.body;
    Article.findByIdAndUpdate(id,{title:title,body:body,author:author,tags:tags,published:true}).then((article)=>{
        res.status(200).send({message:"Successfully updated",article:article})
    }).catch((err)=>{
        res.status(400).send({message:"Error, Not updated successfully",err:err})
    })
}

let getArticles = (req,res)=>{
    let user = req.body.user;
    console.log(req)
    Article.find({author:user}).then((articles)=>{
        res.status(200).send({message:"Successfully fetched",articles:articles})
    }).catch((err)=>{
        res.status(400).send({message:"Error, Not fetched successfully",err:err})
    })
}

let getUnpublishedArticles = (req,res)=>{
    let user = req.body.user;
    console.log(req)
    Article.find({published:false,author:user}).then((articles)=>{
        res.status(200).send({message:"Successfully fetched",articles:articles})
    }).catch((err)=>{
        res.status(400).send({message:"Error, Not fetched successfully",err:err})
    })
}

module.exports={
    signup,
    login,
    addArticle,
    deleteArticle,
    updateArticle,
    updateArticleStatus,
    getArticles,
    getUnpublishedArticles
}