const data = require('../data.json')


// exportando apenas um objeto e utilizando 
module.exports = {
    index(req,res){
        return res.render("dogs/index")
    },
    create(req,res){
        
        return res.render("dogs/create")

    },
    show(req,res){
        return

    },
    post(req,res){
        const keys = Object.keys(req.body)
        for (key of keys){
            if(req.body[key]== ""){
                return res.send("Fill all the fields!")
            }
        }

        return
    },
    edit(req,res){
        return
    },
    put(req,res){
        const keys = Object.keys(req.body)
        for (key of keys){
            if(req.body[key]== ""){
                return res.send("Fill all the fields!")
            }
        }

        return
    },
    delete(req,res){
        return
    }
}
