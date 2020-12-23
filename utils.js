module.exports = {
    age: function age(timestamp) {
        const today = new Date();
        const birthDate = new Date(timestamp);

        //ano
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();


        if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
            age = age - 1
        }
        return age;
    }
}