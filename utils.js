module.exports = {
    age: function age(timestamp) {
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


    schooling: function checkGraduation(schooling) {
        let graduation = ""
        if (schooling == "high_school") graduation = "Ensino Médio"
        else if (schooling == "college_degree") graduation = "Ensino Superior"
        else if (schooling == "master_degree") graduation = "Mestrado"
        else if (schooling == "doctor_degree") graduation = "Doutorado"

        return graduation;
    },

    date: function(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return `${year}-${month}-${day}`

    }
}