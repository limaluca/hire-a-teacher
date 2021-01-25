const Teacher = require('../models/Teacher')
const { date, check_education, age } = require('../../lib/utils')

module.exports = {
    index(request, response) {

        Teacher.all(function(teachers) {
            return response.render("teachers/index", { teachers })


        })
    },
    create(request, response) {
        return response.render("teachers/create")
    },
    post(request, response) {
        const keys = Object.keys(request.body)
            // Validando as chaves

        for (key of keys) {
            if (request.body[key] == "") {
                return response.send("Por favor, preencha todos os campos")
            }
        }

        Teacher.create(request.body, function(teacher) {
            return response.redirect(`/teachers/${teacher.id}`)

        })


    },
    show(request, response) {
        Teacher.find(request.params.id, function(teacher) {
            if (!teacher) return response.send("Teacher not found!!!!")

            teacher.education_level = check_education(teacher.education_level)
            teacher.subjects_taught = teacher.subjects_taught.split(",")
            teacher.birth_date = age(teacher.birth_date)

            return response.render("teachers/show", { teacher })
        })
    },
    edit(request, response) {
        Teacher.find(request.params.id, function(teacher) {
            if (!teacher) return response.send("Teacher not found!!!!")

            teacher.subjects_taught = teacher.subjects_taught.split(",")
            teacher.birth_date = (date(teacher.birth_date)).iso

            return response.render("teachers/edit", { teacher })
        })
    },
    put(request, response) {
        const keys = Object.keys(request.body)
            // Validando as chaves

        for (key of keys) {
            if (request.body[key] == "") {
                return response.send("Por favor, preencha todos os campos")
            }
        }


        Teacher.update(request.body, function() {
            return response.redirect(`/teachers/${request.body.id}`)
        })


    },
    delete(request, response) {
        Teacher.delete(request.body.id, function() {
            return response.redirect("/teachers/")
        })
    },
}