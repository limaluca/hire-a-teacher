const { Pool } = require("pg"); //Pool is for not ask to password everytime

module.exports = new Pool({
    user: 'limalime',
    password: "",
    host: "localhost",
    port: 5432,
    database: "my_teacher"
})