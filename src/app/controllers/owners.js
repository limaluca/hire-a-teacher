// fileSystem and  Data are used for me to enable JSON
const fileSystem = require('fs')
const data = require('../data.json')


exports.index = function(req,res){
    return res.render("owners/index", {owners : data.owners})
    
}

exports.show = function(req,res){
    let {id} = req.params;

    let foundOwner = data.owners.find(function(owner){
        return owner.id == id
    })

    if (!foundOwner){
        return res.send("ownergy not found...")
    }

    let owner = {
        ...foundOwner,
        highlights: foundOwner.highlights.split(",")
        
    }

    return res.render("owners/show", {owner: owner})
}

exports.create  = function(req,res){
    return res.render("owners/create")
}

exports.post = function(req,res){
    
    //validating
    const keys = Object.keys(req.body)
    for (key of keys){
        if(req.body[key]== ""){
            return res.send("Fill all the fields!")
        }
    }

    let {avatar_url, name, species, sex, age, size, highlights} = req.body;

    const id = data.owners.length + 1 

    data.owners.push({
        id,
        avatar_url,
        name,
        species,
        sex,
        age,
        size,
        highlights})

    fileSystem.writeFile("data.json", JSON.stringify(data,null,2),function(err){
        if(err){
            return res.send("Write file error!")
        }
        return res.redirect(`owners/${id}`)
    })

    // return res.send(req.body)


}

exports.edit = function(req,res){
    let {id} = req.params;

    let foundOwner = data.owners.find(function(owner){
        return owner.id == id
    })

    if (!foundOwner){
        return res.send("ownergy not found...")
    }

    //PLEASE GET SOME NOTES ON NOTION ABOUT THIS EDIT  FUNCTION!!!!!!!

    return res.render("owners/edit", {owner: foundOwner})
}

exports.put = function(req,res){
    const {id} = req.body;

    let index = 0;
    const foundOwner = data.owners.find(function(owner,foundIndex){
        if(id == owner.id){
            index = foundIndex
            return true
        }
    })

    if (!foundOwner){
        return res.send("ownergy not found...")
    }

    const owner ={
        ...foundOwner,
        ...req.body
    }

    data.owners[index] = owner

    fileSystem.writeFile("data.json", JSON.stringify(data,null,2), function(err){
        if(err) return res.send("Edit: Write file error!")

        res.redirect(`owners/${id}`)
    })

}

exports.delete = function(req,res){
    const { id } = req.body;

    let filteredOwners = data.owners.filter(function(owner){
        return owner.id != id;
    })

    data.owners = filteredOwners


    fileSystem.writeFile("data.json", JSON.stringify(data,null,2), function(err){
        if(err){
            return res.send("Delete: write file error!")
        }

        return res.redirect(`/owners`)
    })
}


