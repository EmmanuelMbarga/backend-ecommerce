const express = require('express')
const cors=require('cors')
const cookieparser=require('cookie-parser')
require("dotenv").config({path:'./config/.env'})
require("./config/bd")
const Routeutilisateur=require('./routers/utilisateurRoute')
const Routearticle=require('./routers/articlesRoute')
const { verifyconnexion, verifyuser } = require('./middleware/connexioncheck')
const app=express()

//cors
const corsOptions= {
    origin:`${process.env.REACT_URL_CLIENT}`,
    methods:['GET','HEAD','PUT','PATCH','POST','DELETE'],
    credentials:true,
    'allowedHeaders':['sessionId','Content-Type'],
    'exposedHeaders':['sessionId'],
    'preflightContinue':false
}

app.use(cors(corsOptions))
//middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieparser())
//jwt
app.get("*",verifyconnexion)
app.get("/veryfieuser/jwt",verifyuser,(req,res)=>{
    res.status(200).send(res.locals.utilisateur._id)
})

//route app

app.use('/app/shan-ecommerce', Routeutilisateur)
app.use('/app/shan-ecommerce/article', Routearticle)

app.listen(process.env.PORT,()=>{
    console.log('le serveur fonction bien au port :'+process.env.PORT);
})