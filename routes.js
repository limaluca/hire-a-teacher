const express = require('express');
const routes = express.Router();

routes.get("/", function(request, response) {
    return response.render('teachers/index')
})

routes.get("/teachers", function(request, response) {
    return response.render("teachers/index")
})

routes.get("/css", function(request, response) {
    return response.render("teachers/css")
})
module.exports = routes;