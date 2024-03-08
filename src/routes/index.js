const express = require("express");
const postRoutes = require("./postRoutes");
//const userRoutes = require("./userRoutes");

const router = express.Router();

router.use("/posts", postRoutes);
// router.use("/users", userRoutes);

module.exports = router;
