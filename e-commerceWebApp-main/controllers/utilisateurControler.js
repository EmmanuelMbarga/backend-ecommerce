const {Erroruser} = require("../errors/utilisateurerror")
const modelUtilisateur=require("../models/utiliateur")
const objetId=require('mongoose').Types.ObjectId


//creer utilisateur
const createuser=async(req,res)=>{
    const {nom,email,prenom,password}=req.body

    try {
        const Utilisateur=await modelUtilisateur.create({nom,email,prenom,password})
        res.status(200).json({Utilisateur:Utilisateur._id})
    } catch (error) {
        const errorUser=Erroruser(error)
        console.log(error);
        res.status(500).json({errorUser})
    }
}

//afficherutilisateurs
const afficherusers=async(req,res)=>{
    try {
        const utilisateur=await modelUtilisateur.find().select("-password")
        
        res.status(200).json(utilisateur)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

//afficherutilisateur
const afficheruser=async(req,res)=>{
    if(!objetId.isValid(req.params.id)){
        return res.status(400).send('ID inconnu')
    }

    try {
        const utilisateur=await modelUtilisateur.findById({_id:req.params.id}).select('-password')
        res.status(200).json(utilisateur)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}
//modifierutilisateur
const modifuser=async(req,res)=>{
    if(!objetId.isValid(req.params.id)){
        return res.status(400).send('ID inconnu')
    }

    try {
        const utilisateur=await modelUtilisateur.findByIdAndUpdate(
            {_id:req.params.id},
            {$set:{
                nom:req.body.nom,
                email:req.body.email,
            }},
            {new:true,upsert:true,setDefaultsOnInsert:true}
        )
        
        res.status(200).json(utilisateur)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

//supprimerutilisateur
const deleteUser=async(req,res)=>{
    if(!objetId.isValid(req.params.id)){
        return res.status(400).send('ID inconnu')
    }
    try {
        const utilisateur=await modelUtilisateur.deleteOne({_id:req.params.id}).exec()
        res.status(200).json(utilisateur)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

module.exports={createuser,afficherusers,afficheruser,modifuser,deleteUser}

