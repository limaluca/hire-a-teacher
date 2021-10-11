const express = require('express');
const routes = express.Router();
const dogs = require("./app/controllers/dogs")
const owners = require('./app/controllers/owners')

routes.get("/", dogs.index)

routes.get("/dogs", dogs.index)

routes.get("/dogs/create", dogs.create)

routes.get("/dogs/:id", dogs.show)

routes.get("/dogs/:id/edit", dogs.edit)

routes.post("/dogs", dogs.post)

routes.put("/dogs", dogs.put)

routes.delete("/dogs", dogs.delete)



routes.get("/", function(req,res){
    return res.render("layout")
})

routes.get("/owners", owners.index)

routes.get("/owners/create", owners.create)

routes.get("/owners/:id", owners.show)

routes.get("/owners/:id/edit", owners.edit)

routes.post("/owners", owners.post)

routes.put("/owners", owners.put)

routes.delete("/owners", owners.delete)


module.exports = routes;