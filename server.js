//importation
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./src/routes");

//declaration variable
const PORT = 4000;
const db = "mongodb://127.0.0.1:27017/royal";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", routes);

//lancement du serveur
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);

  //connection a la bd
  mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Successfully connected to the database"))
    .catch((err) => console.error(err));
});
