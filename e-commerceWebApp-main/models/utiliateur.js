/**
 * nom:string
 * prenom:string 
 * email:string
 * password:string and number
 * */ 

const mongoose=require('mongoose')
const {isEmail} =require('validator')
const bcrypt=require('bcrypt')

const utlisateurSchema=new mongoose.Schema({
    nom:{
        type:String,
        require:true,
        unique:false,
        minlength:4,
        maxlength:20
    },
    prenom:{
        type:String,
        require:true,
        unique:false,
        minlength:4,
        maxlength:20
    },
    email:{
        type:String,
        require:true,
        unique:true,
        minlength:13,
        maxlength:40,
        lowercase:true,
        validate:[isEmail]
    },
    password:{
        type:String,
        require:true,
        unique:true,
        minlength:5,
        maxlength:1420
    }
},
{
    timestamps:true
}) 


utlisateurSchema.pre('save',async function(next){
    const salt= await bcrypt.genSalt()
    this.password=await bcrypt.hash(this.password, salt)
    next()
})

utlisateurSchema.statics.login=async function(email,password){
    const utilisateur=await this.findOne({email})

    if (utilisateur) {
        const authentification=await bcrypt.compare(password,utilisateur.password)
        if (authentification) {
            return utilisateur;
        } else {
            throw Error('mot de passe incorrect')
        }
    } else {
        throw Error('email incorret')
    }
}

const modelUtilisateur=mongoose.model("utilisateur_authentification", utlisateurSchema)


module.exports=modelUtilisateur