var express = require("express");
const router = express.Router();

var taskRoutes = require("./task");

router.use("/task", taskRoutes);

module.exports = router;
