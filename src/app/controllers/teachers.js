const Teacher = require('../controllers/models/Teacher')

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
        return
    },
    edit(request, response) {
        return
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