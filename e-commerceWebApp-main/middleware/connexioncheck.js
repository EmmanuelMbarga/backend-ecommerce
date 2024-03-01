const jwt=require('jsonwebtoken')
const modelUtilisateur = require('../models/utiliateur')
require('dotenv').config({path:"./config/.env"})

const verifyconnexion=async(req,res,next)=>{
    const token=req.cookies.jwt

    if (token) {
         jwt.verify(token,process.env.TOKEN_SECRET_ESHOP,async function(error,decocedToken){
            if (error) {
                res.locals.utilisateur=null;
                res.cookie("jwt",'',{maxAge:1})
                next()
            }else{
                let utilisateur =await modelUtilisateur.findById(decocedToken.id)
                res.locals.utilisateur=utilisateur
                // console.log(utilisateur);
                next();
            }
        })
    } else {
        res.locals.utilisateur=null
        next()
    }
} 

const verifyuser=async(req,res,next)=>{
    const token=req.cookies.jwt
    if (token) {
        jwt.verify(token,process.env.TOKEN_SECRET_ESHOP,async function(error,decodedToken){
            if (error) {
                console.log(error);
            } else {
                console.log(decodedToken.id);
                next()
            }
        })
    }else{
        console.log("pas de token");
    } 

} 

module.exports={verifyconnexion,verifyuser}