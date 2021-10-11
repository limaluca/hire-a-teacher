const express = require('express');
const routes = express.Router();
const dogs = require("./app/controllers/dogs")
const owners = require('./app/controllers/owners')
const animals = require("./app/controllers/animals")







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





routes.get("/", animals.index)

routes.get("/animals", animals.index)

routes.get("/animals/create", animals.create)

routes.get("/animals/:id", animals.show)

routes.get("/animals/:id/edit", animals.edit)

routes.post("/animals", animals.post)

routes.put("/animals", animals.put)

// routes.delete("/animals", animals.delete)

// routes.get("/", dogs.index)

// routes.get("/dogs", dogs.index)

// routes.get("/dogs/create", dogs.create)

// routes.get("/dogs/:id", dogs.show)

// routes.get("/dogs/:id/edit", dogs.edit)

// routes.post("/dogs", dogs.post)

// routes.put("/dogs", dogs.put)

// routes.delete("/dogs", dogs.delete)

module.exports = routes;