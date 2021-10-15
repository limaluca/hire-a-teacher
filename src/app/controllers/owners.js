const Owner = require("../models/Owner")

module.exports={
    index(req,res){

        Owner.all(function(owners){
            return res.render("owners/index", { owners })
        })

        
        
    },
    create(req,res){
        return res.render("owners/create")

    },
    post(req,res){
        const keys = Object.keys(req.body)
            for (key of keys){
                if(req.body[key]== ""){
                    return res.send("Fill all the fields!")
                }
            }
        
        Owner.create(req.body, function(owner){
            return res.redirect(`owners/${owner.id}`)
        })
    },
    show(req,res){
        Owner.find(req.params.id, function(owner){
            if(!owner) return res.send("Owner not found!")

            owner.highlights = owner.highlights.split(",")
            return res.render("owners/show", {owner})
        })
    },
    edit(req,res){
        Owner.find(req.params.id, function(owner){
            if(!owner) return res.send("Owner not found!")

            owner.highlights = owner.highlights.split(",")
            return res.render("owners/edit", {owner})
        })
    },
    put(req,res){
        Owner.update(req.body, function(){
            return res.redirect(`owners/${req.body.id}`)
        })
    },
    delete(req,res){
        Owner.delete(req.body.id,function(){
            return res.redirect("/owners")
        })
    }
}
