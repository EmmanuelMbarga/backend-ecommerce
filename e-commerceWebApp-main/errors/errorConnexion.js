const Errconnexion=(error)=>{
    let Errors={email:'',password:''}


    if (error.message.includes('email incorret')) {
        Errors.email='email incorrecte veuillez réessayer svp.'
    }
    if (error.message.includes('mot de passe incorrect')) {
        Errors.password='mot de passe incorrect veuillez réessayer svp.'
    }
    return Errors
}

module.exports=Errconnexion