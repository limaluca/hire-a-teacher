//Exportando funcoes para POST, CREATE, DELETE

const fs = require('fs');
const data = require('./data.json')

// POST
exports.post = function(request, response) {

    // arrays com as chaves do body
    const keys = Object.keys(request.body)

    // Validando as chaves
    for (key of keys) {
        if (request.body[key] == "") {
            return response.send("Por favor, preencha todos os campos")
        }
    }

    data.teachers.push(request.body)

    // os args de writeFile: Local, coloca-se o data para o formato JSON(null so pra pular e 2 eh o espaçamento no data.json)

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
            if (err) return response.send("Write file error!")

            return response.redirect("/teachers")
        })
        // return response.send(request.body);
}