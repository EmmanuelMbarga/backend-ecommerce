const express=require('express')
const { createuser, afficheruser, afficherusers, modifuser, deleteUser } = require('../controllers/utilisateurControler')
const { connexion, deconnexion } = require('../controllers/authentification')
const router=express.Router()

//crud classique

router.route('/enregistrer').post(createuser)
router.route('/enregistrer/utilisateur').get(afficherusers)
router.route('/enregistrer/utilisateur/:id').get(afficheruser)
router.route('/enregistrer/utilisateur/modif/:id').put(modifuser)
router.route('/enregistrer/utilisateur/delete/:id').delete(deleteUser)

//autehntification
router.route('/connexion').post(connexion)
router.route('/deconnexion').get(deconnexion)


module.exports=router