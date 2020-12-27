const express = require('express');
const routes = express.Router();
const teachers = require('./teachers')



routes.get("/", teachers.index)

routes.get("/teachers", teachers.index)

routes.get("/teachers/create", function(request, response) {
    return response.render("teachers/create")
})

routes.post("/teachers", teachers.post)


routes.get("/teachers/:id", teachers.show)

routes.get("/teachers/:id/edit", teachers.edit)

routes.put("/teachers", teachers.put)

routes.delete("/teachers", teachers.delete)


module.exports = routes;