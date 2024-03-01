const express=require('express')
const afficherLesarticles = require('../controllers/postControler')
const ApipaiementOM=require('./../controllers/paiementArticle')
const router=express.Router()

router.route('/acticle').get(afficherLesarticles)
router.route('/paiement/loading').post(ApipaiementOM)
module.exports=router