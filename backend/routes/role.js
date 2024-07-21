const express = require("express");
const { createNewRole } = require("../controllers/role");
const { createNewPermission } = require("../controllers/role");



const rolesRouter = express.Router();

rolesRouter.post("/", createNewRole);
rolesRouter.post("/permission", createNewPermission);


module.exports = rolesRouter;
