const {modelArticle}=require("../models/articles")

const afficherLesarticles=async(req,res)=>{
    try {
        const article=await modelArticle.find()

        res.status(200).json(article)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

module.exports=afficherLesarticles