//Exportando funcoes para POST, CREATE, DELETE

const fs = require('fs');
const data = require('../data.json') //Dois pontos para voltar duas pastas
const { age, school_year, date } = require('../utils')


exports.index = function(request, response) {
    return response.render("students/index", { students: data.students })
}

exports.create = function(request, response) {
        return response.render("students/create")
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
            //dessa forma podemos renomear as variaveis
            avatar_url: avatar,
            name,
            email,
            birth,
            school_year,
            study_hours,
        } = request.body;

        birth = Date.parse(birth);

        let id = 1;
        const lastStudent = data.students[data.students.length - 1]

        if (lastStudent) {
            id = lastStudent.id + 1
        }

        //This order is the same on the data.json
        data.students.push({
            id,
            name,
            avatar,
            email,
            birth,
            school_year,
            study_hours,

        })

        // os args de writeFile: Local, coloca-se o data para o 
        //formato JSON(null so pra pular e 2 eh o espaçamento no data.json)

        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
                if (err) return response.send("Write file error!")

                return response.redirect(`/students/${id}`)
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

        if (!foundstudent) return response.send("Student not found.");



        const student = {
            //spread operator (everything else on the student)
            ...foundstudent,
            birth: date(foundstudent.birth).birthDay,
            school_year: school_year(foundstudent.school_year)
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

        if (!foundstudent) return response.send("Student not found.");

        const student = {
            ...foundstudent,
            birth: date(foundstudent.birth).iso
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

    if (!foundstudent) return response.send("Student not found.");


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