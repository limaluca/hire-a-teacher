const express = require('express');
const routes = express.Router();

routes.get("/", function(request, response) {
    return response.render('teachers/index')
})

routes.get("/teachers", function(request, response) {
    return response.render("teachers/index")
})

routes.get("/teachers/create", function(request, response) {
    return response.render("teachers/create")
})

routes.post("/teachers", function(request, response) {
    return response.send("Recebido")
})


module.exports = routes;