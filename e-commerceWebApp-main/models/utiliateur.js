const mongoose=require('mongoose')
const {isEmail} =require('validator')
const bcrypt=require('bcrypt')

const utlisateurSchema=new mongoose.Schema({
    nom:{
        type:String,
        require:true,
        minlength:4,
        maxlength:20
    },
    prenom:{
        type:String,
        require:true,
        minlength:4,
        maxlength:20
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validate:[isEmail]
    },
    password:{
        type:String,
        require:true,
        minlength:5,
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
        throw Error('email incorrect')
    }
}

const modelUtilisateur=mongoose.model("utilisateur_authentification", utlisateurSchema)


module.exports=modelUtilisateur