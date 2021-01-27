const { age, date, yearCheck } = require('../../lib/utils')
const Student = require('../models/Student')


module.exports = {
    index(request, response) {

        Student.all(function(students) {
            return response.render("students/index", { students })


        })
    },
    create(request, response) {

        Student.teachersSelectOptions(function(options) {

            return response.render("students/create", { teacherOptions: options })

        })
    },
    post(request, response) {
        const keys = Object.keys(request.body)
            // Validando as chaves

        for (key of keys) {
            if (request.body[key] == "") {
                return response.send("Por favor, preencha todos os campos")
            }
        }
        let student = request.body.study_hours
        Student.create(request.body, function(student) {
            return response.redirect(`/students/${student.id}`)

        })


    },
    show(request, response) {
        Student.find(request.params.id, function(student) {
            if (!student) return response.send("Student not found!!!!")

            student.birth_date = age(student.birth_date)

            return response.render("students/show", { student })
        })
    },
    edit(request, response) {
        Student.find(request.params.id, function(student) {
            if (!student) return response.send("Student not found!!!!")


            student.birth_date = (date(student.birth_date)).iso

            console.log(student.teacher_id);


            Student.teachersSelectOptions(function(options) {
                return response.render("students/edit", { student, teacherOptions: options })

            })
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


        Student.update(request.body, function() {
            return response.redirect(`/students/${request.body.id}`)
        })


    },
    delete(request, response) {
        Student.delete(request.body.id, function() {
            return response.redirect("/students/")
        })
    },
}