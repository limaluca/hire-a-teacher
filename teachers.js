//Exportando funcoes para POST, CREATE, DELETE

const fs = require('fs');
const data = require('./data.json')
const { age } = require('./utils')

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
    let {
        avatar_url: avatar, //dessa forma podemos renomear as variaveis
        name,
        birth,
        schooling,
        classes_type,
        disciplines
    } = request.body;

    birth = Date.parse(birth);
    created_at = Date.now();
    const id = Number(data.teachers.length + 1);

    //This order is the same on the data.json
    data.teachers.push({
        id,
        avatar,
        name,
        birth,
        schooling,
        classes_type,
        disciplines,
        created_at
    })

    // os args de writeFile: Local, coloca-se o data para o 
    //formato JSON(null so pra pular e 2 eh o espaçamento no data.json)

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
            if (err) return response.send("Write file error!")

            return response.redirect("/teachers")
        })
        // return response.send(request.body);
}

//SHOW //request.params.id
exports.show = function(request, response) {
    //destructuring
    const { id } = request.params

    const foundTeacher = data.teachers.find(function(teacher) {
        return id == teacher.id
    });

    if (!foundTeacher) return response.send("Instructor not found.");



    const teacher = {
        //spread operator (everything else on the teacher)
        ...foundTeacher,
        birth: age(foundTeacher.birth),
        schooling: "",
        disciplines: foundTeacher.disciplines.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at)
    }

    return response.render("teachers/show", { teacher })

}