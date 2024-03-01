const mongoose = require("mongoose");
require('dotenv').config({path:"./config/.env"})

mongoose
  .connect(
    "mongodb+srv://"+process.env.PASSWORD_BD+"@expressapi.3vibthu.mongodb.net/shan_ecommerce_data_base"
  )
  .then(() => {
    console.log("connexion a la base de donnée reussie");
  })
  .catch((error) => {
    console.log(console.error(error));
  });

module.exports=mongoose