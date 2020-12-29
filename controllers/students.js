//Exportando funcoes para POST, CREATE, DELETE

const fs = require('fs');
const data = require('../data.json')
const { age, schooling, date } = require('../utils')


exports.index = function(request, response) {
        return response.render("students/index", { students: data.students })
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
    const id = Number(data.students.length + 1);

    //This order is the same on the data.json
    data.students.push({
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

            return response.redirect("/students")
        })
        // return response.send(request.body);
}


//SHOW //request.params.id
exports.show = function(request, response) {
    //destructuring
    const { id } = request.params

    const foundstudent = data.students.find(function(student) {
        return id == student.id
    });

    if (!foundstudent) return response.send("Instructor not found.");



    const student = {
        //spread operator (everything else on the student)
        ...foundstudent,
        birth: age(foundstudent.birth),
        schooling: schooling(foundstudent.schooling),
        created_at: new Intl.DateTimeFormat("en-US").format(foundstudent.created_at)
    }

    return response.render("students/show", { student })

}


//EDIT
exports.edit = function(request, response) {
        //destructuring again
        const { id } = request.params

        const foundstudent = data.students.find(function(student) {
            return id == student.id
        });

        if (!foundstudent) return response.send("Instructor not found.");

        const student = {
            ...foundstudent,
            birth: date(foundstudent.birth)
        }

        return response.render("students/edit", { student })
    }
    //PUT / UPDATE
exports.put = function(request, response) {

    const { id } = request.body
    let index = 0;

    const foundstudent = data.students.find(function(student, foundIndex) {
        if (id == student.id) {
            index = foundIndex
            return true
        }
    });

    if (!foundstudent) return response.send("Instructor not found.");


    const student = {
        ...foundstudent,
        ...request.body, //dados novos atualizados do student
        birth: Date.parse(request.body.birth),
        id: Number(request.body.id) //Previnir do id ser transformado em string
    }

    data.students[index] = student;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return response.send("Writing file error")

        return response.redirect(`/students/${id}`);
    })
}

exports.delete = function(request, response) {
    const { id } = request.body

    //novo array
    //so vai pro novo array o que retornar true
    const filteredStudents = data.students.filter(function(student) {
        return student.id != id

    })

    data.students = filteredStudents;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return response.send("Writing file error")
        return response.redirect("/students")
    })

}