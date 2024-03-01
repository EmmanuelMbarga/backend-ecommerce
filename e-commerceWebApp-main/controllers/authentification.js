// const Errconnexion = require('../errors/errorConnexion')
const modelUtilisateur = require("../models/utiliateur");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/.env" });
const maxAge = 2 * 60 * 60 * 24 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET_ESHOP, {
    expiresIn: maxAge,
  });
};

const connexion = async (req, res) => {
  const { email, password } = req.body;
  try {
    const utilisateur = await modelUtilisateur.login(email, password);
    const token = createToken(utilisateur._id);

    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json(utilisateur._id);
  } catch (error) {
    // const errConnexion=Errconnexion(error)
    console.log(error);
    // res.status(500).json({errConnexion})
    res.status(500).json(error);
  }
};

const deconnexion = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).redirect("/");
};

module.exports = { connexion, deconnexion };
