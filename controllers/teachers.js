//Exportando funcoes para POST, CREATE, DELETE

const fs = require('fs');
const data = require('../data.json')
const { age, schooling, date } = require('../utils')


exports.index = function(request, response) {
        return response.render("teachers/index", { teachers: data.teachers })
    }
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
            schooling: schooling(foundTeacher.schooling),
            disciplines: foundTeacher.disciplines.split(","),
            created_at: new Intl.DateTimeFormat("en-US").format(foundTeacher.created_at)
        }

        return response.render("teachers/show", { teacher })

    }
    //EDIT
exports.edit = function(request, response) {
        //destructuring again
        const { id } = request.params

        const foundTeacher = data.teachers.find(function(teacher) {
            return id == teacher.id
        });

        if (!foundTeacher) return response.send("Instructor not found.");

        const teacher = {
            ...foundTeacher,
            birth: date(foundTeacher.birth)
        }

        return response.render("teachers/edit", { teacher })
    }
    //PUT / UPDATE
exports.put = function(request, response) {

    const { id } = request.body
    let index = 0;

    const foundTeacher = data.teachers.find(function(teacher, foundIndex) {
        if (id == teacher.id) {
            index = foundIndex
            return true
        }
    });

    if (!foundTeacher) return response.send("Instructor not found.");


    const teacher = {
        ...foundTeacher,
        ...request.body, //dados novos atualizados do teacher
        birth: Date.parse(request.body.birth),
        id: Number(request.body.id) //Previnir do id ser transformado em string
    }

    data.teachers[index] = teacher;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return response.send("Writing file error")

        return response.redirect(`/teachers/${id}`);
    })
}

exports.delete = function(request, response) {
    const { id } = request.body

    //novo array
    //so vai pro novo array o que retornar true
    const filteredTeachers = data.teachers.filter(function(teacher) {
        return teacher.id != id

    })

    data.teachers = filteredTeachers;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return response.send("Writing file error")
        return response.redirect("/teachers")
    })

}