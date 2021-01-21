module.exports = {
    age(timestamp) {
        const today = new Date();
        const birthDate = new Date(timestamp);

        //ano
        let age = today.getFullYear() - birthDate.getFullYear();
        let month = today.getMonth() - birthDate.getMonth();


        if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
            age = age - 1
        }
        return age;
    },


    schooling(schooling) {
        let graduation = ""
        if (schooling == "high_school") graduation = "Ensino Médio"
        else if (schooling == "college_degree") graduation = "Ensino Superior"
        else if (schooling == "master_degree") graduation = "Mestrado"
        else if (schooling == "doctor_degree") graduation = "Doutorado"

        return graduation;
    },

    school_year(school_year) {
        let studentsYear = ""
        if (school_year == "five") studentsYear = "Quinto Ano"
        else if (school_year == "six") studentsYear = "Sexto Ano"
        else if (school_year == "seven") studentsYear = "Setimo Ano"
        else if (school_year == "eight") studentsYear = "Oitavo Ano"
        else if (school_year == "nine") studentsYear = "Nono Ano"
        else if (school_year == "freshmen") studentsYear = "1º Ano"
        else if (school_year == "junior") studentsYear = "2º Ano"
        else if (school_year == "senior") studentsYear = "3º Ano"

        return studentsYear;
    },

    date(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }




    }
}