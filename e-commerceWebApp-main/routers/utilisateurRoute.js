const express = require("express");
const {
  createuser,
  afficheruser,
  afficherusers,
  modifuser,
  deleteUser,
} = require("../controllers/utilisateurControler");
const { connexion, deconnexion } = require("../controllers/authentification");
const genValidator = require("../middleware/validate");
const errorMiddleware = require("../middleware/errorMiddleware");
const joiSchemas = require("../joiSchemas");
const router = express.Router();

// ici ca commence a /api/v1/user

//crud classique
router
  .route("/")
  .get(afficherusers)
  .post(genValidator(joiSchemas.createUserSchema), createuser);
router.route("/:id").get(afficheruser).delete(deleteUser).put(modifuser);

//autehntification
router
  .route("/connexion")
  .post(genValidator(joiSchemas.loginSchema), connexion);
router.route("/deconnexion").get(deconnexion);

router.use(errorMiddleware);

module.exports = router;
