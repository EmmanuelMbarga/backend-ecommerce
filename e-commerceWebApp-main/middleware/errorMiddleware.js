const { default: mongoose } = require("mongoose");
const AppError = require("../utils/AppError");

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof AppError) {
    if (err.isOperational) console.log("Notre erreur est operationnelle");
    else console.log("Notre erreur est non operationnelle");
    return res.status(err.statusCode).json({ msg: err.message });
  }
  if (err instanceof mongoose.Error.ValidationError){
    return res.status(400).json({ msg: err.message });
  }
  return res.status(500).json({ msg: "Erreur Interne" , reason : err.message });
};

module.exports = errorMiddleware;
