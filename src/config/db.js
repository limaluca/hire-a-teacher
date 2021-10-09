//Pool is a way to create and test connections with a DB without worrying about credentials
const { Pool } = require("pg")

module.exports = new Pool({
    user:"lucaslima",
    password:"",
    host:"localhost",
    port:"5432",
    database:"adoptiondb"

})

