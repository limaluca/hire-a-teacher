// fileSystem and  Data are used for me to enable JSON
const fileSystem = require('fs')
const data = require('../data.json')


exports.index = function(req,res){
    return res.render("dogs/index", {dogs : data.dogs})
    
}

exports.create =  function(req,res){
    return res.render("dogs/create")
}

exports.show = function(req,res){
    let {id} = req.params;

    let foundDog = data.dogs.find(function(dog){
        return dog.id == id
    })

    if (!foundDog){
        return res.send("doggy not found...")
    }

    let dog = {
        ...foundDog,
        highlights: foundDog.highlights.split(",")
        
    }

    return res.render("dogs/show", {dog: dog})
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

    const id = data.dogs.length + 1 

    data.dogs.push({
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
        return res.redirect(`dogs/${id}`)
    })

    // return res.send(req.body)


}

exports.edit = function(req,res){
    let {id} = req.params;

    let foundDog = data.dogs.find(function(dog){
        return dog.id == id
    })

    if (!foundDog){
        return res.send("doggy not found...")
    }

    //PLEASE GET SOME NOTES ON NOTION ABOUT THIS EDIT  FUNCTION!!!!!!!

    return res.render("dogs/edit", {dog: foundDog})
}

exports.put = function(req,res){
    const {id} = req.body;

    let index = 0;
    const foundDog = data.dogs.find(function(dog,foundIndex){
        if(id == dog.id){
            index = foundIndex
            return true
        }
    })

    if (!foundDog){
        return res.send("doggy not found...")
    }

    const dog ={
        ...foundDog,
        ...req.body
    }

    data.dogs[index] = dog

    fileSystem.writeFile("data.json", JSON.stringify(data,null,2), function(err){
        if(err) return res.send("Edit: Write file error!")

        res.redirect(`dogs/${id}`)
    })

}

exports.delete = function(req,res){
    const { id } = req.body;

    let filteredDogs = data.dogs.filter(function(dog){
        return dog.id != id;
    })

    data.dogs = filteredDogs


    fileSystem.writeFile("data.json", JSON.stringify(data,null,2), function(err){
        if(err){
            return res.send("Delete: write file error!")
        }

        return res.redirect(`/dogs`)
    })
}


