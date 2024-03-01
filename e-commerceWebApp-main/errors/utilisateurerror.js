const Erroruser=(error)=>{
    let Errors={nom:"",prenom:"", email:"",password:""}

    if (error.message.includes("nom")) {
        Errors.nom="le nom doit contenir min 4 ou max 20 caractères"
    }
    if (error.message.includes("prenom")) {
        Errors.prenom="le prenom doit contenir min 4 ou max 20 caractères"
    }
    if (error.message.includes('email')) {
        Errors.email="l'email doit contenir min 13 ou max 40 caractères"
    }
    if (error.message.includes('password')) {
        Errors.password="le mot de passe doit contenir min 5 caractères "
    }


    if(error.code === 11000 && Object.keys(error.keyValue)[0].includes('email')){
        Errors.email=" email existant"
    }

    return Errors
}

module.exports={Erroruser}