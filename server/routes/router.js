const epxress = require("express");
const services = require("../services/render");
const route = epxress.Router();

route.get("/", services.homeRoutes);
route.get("/add-user", services.add_user);
route.get("/update-user", services.update_user);

module.exports = route;
