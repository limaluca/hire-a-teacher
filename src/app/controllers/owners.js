

module.exports={
    index(req,res){
        return res.render("owners/index")
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
        let {avatar_url, name, species, sex, age, size, highlights} = req.body;
        return
    },
    show(req,res){
        return
    },
    edit(req,res){
        return
    },
    put(req,res){
        return
    },
    delete(req,res){
        return
    }
}
