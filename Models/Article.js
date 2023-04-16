const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    published:{
        type:Boolean,
        default:false
    },
    tags:{
        type:[]
    }

});

module.exports = mongoose.model('Article', ArticleSchema);