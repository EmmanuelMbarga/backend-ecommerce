const mongoose=require('mongoose')

const articleSchema=new mongoose.Schema({
    nom:{
        type:String,
        maxlength:150,
    },
    Image:{
        type:String,
    },
    description:{
        type:String,
        maxlength:150,

    },
    cathegorie:{
        type:String,
        maxlength:150,

    },
    prix:{
        type:Number,
    }

}) 

const modelArticle=mongoose.model('Articles',articleSchema)

module.exports={modelArticle}