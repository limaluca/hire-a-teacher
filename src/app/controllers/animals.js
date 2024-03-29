const Animal = require("../models/Animal")

module.exports={
    index(req,res){
        const { filter } = req.query
        if (filter){
            Animal.findBy(filter, function(animals){
                return res.render("animals/index", { animals })
            })
        } else {
            Animal.all(function(animals){
                return res.render("animals/index", { animals })
            })
        }


        
    },
    create(req,res){
        Animal.ownersSelectOptions(function(options){
            return res.render("animals/create", {ownerOptions: options})
        })

    },
    post(req,res){
        const keys = Object.keys(req.body)
            for (key of keys){
                if(req.body[key]== ""){
                    return res.send("Fill all the fields!")
                }
            }
        
        Animal.create(req.body, function(animal){
            return res.redirect(`animals/${animal.id}`)
        })
    },
    show(req,res){
        Animal.find(req.params.id, function(animal){
            if(!animal) return res.send("Animal not found!")

            animal.highlights = animal.highlights.split(",")
            return res.render("animals/show", {animal})
        })
    },
    edit(req,res){
        Animal.find(req.params.id, function(animal){
            if(!animal) return res.send("Animal not found!")

            animal.highlights = animal.highlights.split(",")
            Animal.ownersSelectOptions(function(options){
                return res.render("animals/edit", {animal, ownerOptions:options})
            })
        })
    },
    put(req,res){
        Animal.update(req.body, function(){
            return res.redirect(`animals/${req.body.id}`)
        })
    },
    delete(req,res){
        Animal.delete(req.body.id,function(){
            return res.redirect("/animals")
        })
    }
}
