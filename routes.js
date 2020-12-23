const express = require('express');
const routes = express.Router();
const teachers = require('./teachers')

routes.get("/", function(request, response) {
    return response.render('teachers/index')
})

routes.get("/teachers", function(request, response) {
    return response.render("teachers/index")
})

routes.get("/teachers/create", function(request, response) {
    return response.render("teachers/create")
})

routes.post("/teachers", teachers.post)


routes.get("/teachers/:id", teachers.show)

routes.get("/teachers/:id/edit", function(request, response) {
    return response.render("teachers/edit")
})


module.exports = routes;