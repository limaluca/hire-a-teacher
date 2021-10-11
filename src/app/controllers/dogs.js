const Dog = require("../models/Dog")

module.exports={
    index(req,res){

        Dog.all(function(dogs){
            return res.render("dogs/index", { dogs })
        })
        
    },
    create(req,res){
        return res.render("dogs/create")

    },
    post(req,res){
        const keys = Object.keys(req.body)
            for (key of keys){
                if(req.body[key]== ""){
                    return res.send("Fill all the fields!")
                }
            }
        
        Dog.create(req.body, function(dog){
            return res.redirect(`dogs/${dog.id}`)
        })
    },
    show(req,res){
        Dog.find(req.params.id, function(dog){
            if(!dog) return res.send("Dog not found!")

            dog.highlights = dog.highlights.split(",")
            return res.render("dogs/show", {dog})
        })
    },
    edit(req,res){
        Dog.find(req.params.id, function(dog){
            if(!dog) return res.send("Dog not found!")

            dog.highlights = dog.highlights.split(",")
            return res.render("dogs/edit", {dog})
        })
    },
    put(req,res){
        Dog.update(req.body, function(){
            return res.redirect(`dogs/${req.body.id}`)
        })
    },
    delete(req,res){
        Dog.delete(req.body.id,function(){
            return res.redirect("/dogs")
        })
    }
}
