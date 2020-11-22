const express = require('express');
const routes = express.Router();

routes.get("/", function(request, response) {
    return response.send('index')
})

routes.get("/teachers", function(request, response) {
    return response.render("teachers/index")
})
module.exports = routes;