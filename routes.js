const express = require('express');
const routes = express.Router();
const teachers = require('./controllers/teachers')
const students = require('./controllers/students')




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


routes.get("/", students.index)

routes.get("/students", students.index)

routes.get("/students/create", function(request, response) {
        return response.render("students/create")
    }) //depois mudar para chamar funcao do students. O mesmo pro teachers

routes.post("/students", students.post)


routes.get("/students/:id", students.show)

routes.get("/students/:id/edit", students.edit)

routes.put("/students", students.put)

routes.delete("/students", students.delete)


module.exports = routes;