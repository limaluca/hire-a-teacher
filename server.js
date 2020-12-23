const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes')
const methodOverride = require('method-override')

const server = express();

server.set('view engine', '.njk');

//used when we use post
server.use(express.urlencoded({ extended: true }));

server.use(express.static('public'));
server.use(methodOverride('_method'))

server.use(routes)


nunjucks.configure("views", {
    express: server
});

server.listen(5000, function() {
    console.log("My server is running. . .")
})