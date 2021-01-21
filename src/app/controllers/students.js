const { age, schooling, date } = require('../../lib/utils')


module.exports = {
    index(request, response) {
        return response.render("students/index")
    },
    create(request, response) {
        return response.render("students/create")
    },
    post(request, response) {
        const keys = Object.keys(request.body)
            // Validando as chaves

        for (key of keys) {
            if (request.body[key] == "") {
                return response.send("Por favor, preencha todos os campos")
            }
        }
        return
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