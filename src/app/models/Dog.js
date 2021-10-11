const db = require("../../config/db")

module.exports = {
    all(callback){
        db.query(`SELECT * FROM dogs`, function(err,results){
            if(err){
                console.log("index: Database error!")
                return
            }
            callback(results.rows)
        })

    },
    create(data, callback){
        const query = `
            INSERT INTO dogs (
                avatar_url,
                name,
                species,
                sex,
                age,
                size,
                highlights
            ) VALUES($1,$2,$3,$4,$5,$6,$7)
            RETURNING id
        `
        
        
        const values = [
            data.avatar_url,
            data.name,
            data.species,
            data.sex,
            data.age,
            data.size,
            data.highlights,
        ]

        db.query(query,values, function(err,results) {
            console.log(err)
            console.log(results)
            if (err){
                console.log("Database error!")
                return
            }
            callback(results.rows[0])
        })

    },
    find(id,callback){
        db.query(`SELECT * FROM dogs WHERE id=$1`, [id], function(err,results){
            if(err){
                console.log("Find: Database error!")
                return
            }
            callback(results.rows[0])
        })
    },
    update(data,callback){
        const query =`
            UPDATE dogs SET 
            avatar_url=($1),
            name=($2),
            species=($3),
            sex=($4),
            age=($5),
            size=($6),
            highlights=($7)
            WHERE id= $8
        `
        const values = [
            data.avatar_url,
            data.name,
            data.species,
            data.sex,
            data.age,
            data.size,
            data.highlights,
            data.id
        ]

        db.query(query,values,function(err,results){
            console.log(err)
            console.log(results)
            if (err){
                console.log("Database error!")
                return
            }
            callback()
        })

    }
}