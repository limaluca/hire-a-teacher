//Exportando funcoes para POST, CREATE, DELETE

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

    return response.send(request.body);
}