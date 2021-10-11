const { Pool } = require("pg")

module.exports = new Pool({
    user:"lucaslima",
    password:"",
    host:"localhost",
    port: 5432,
    database: "adoptiondatabase"

})

