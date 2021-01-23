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
            teacher.created_at = date(teacher.created_at).format

            return response.render("teachers/show", { teacher })
        })
    },
    edit(request, response) {
        Teacher.find(request.params.id, function(teacher) {
            if (!teacher) return response.send("Teacher not found!!!!")
            console.log(teacher.birth_date)
            teacher.birth_date = date(teacher.birth_date).format

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
        return
    },
    delete(request, response) {
        return
    },
}