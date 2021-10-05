//Semana 3 no notion
const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes')
const methodOverride = require('method-override')
const server = express();

server.set('view engine', '.njk');

server.use(express.urlencoded({extended:true})) //enables the data to come from the front-end
server.use(express.static('public'));
server.use(methodOverride('_method')) // this override needs to be placed before the routes usage
server.use(routes)


nunjucks.configure("src/app/views", {
    express: server,
    autoescape:false,
    noCache: true
});

server.listen(5000, function() {
    console.log("My server is running. . .")
})
