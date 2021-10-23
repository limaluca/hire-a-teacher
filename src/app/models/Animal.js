const db = require("../../config/db")

module.exports = {
    all(callback){
        db.query(`SELECT * FROM animals`, function(err,results){
            if(err) throw `index: Database error! ${err}`
         
            callback(results.rows)
        })

    },
    create(data, callback){
        const query = `
            INSERT INTO animals (
                avatar_url,
                name,
                species,
                sex,
                age,
                size,
                highlights,
                owner_id
            ) VALUES($1,$2,$3,$4,$5,$6,$7,$8)
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
            data.owner_id
        ]

        db.query(query,values, function(err,results) {
            console.log(err)
            console.log(results)

            if(err) throw `create: Database error! ${err}`
            
            return callback(results.rows[0])
        })

    },
    find(id,callback){
        db.query(`SELECT animals.*, owners.name AS owner_name 
                FROM animals
                LEFT JOIN owners ON (animals.owner_id = owners.id) 
                WHERE animals.id=$1`, [id], function(err,results){
            if(err){
                console.log(`Find: Database error! ${err}`)
                return
            }
            return callback(results.rows[0])
        })
    },
    findBy(filter,callback){
        db.query(`SELECT * FROM animals 
        WHERE animals.name ILIKE '%${filter}%'
        OR animals.highlights ILIKE '%${filter}%'`, 
        function(err,results){
            if(err) throw `index: Database error! ${err}`
         
            callback(results.rows)
        })
    },
    update(data,callback){
        const query =`
            UPDATE animals SET 
            avatar_url=($1),
            name=($2),
            species=($3),
            sex=($4),
            age=($5),
            size=($6),
            highlights=($7),
            owner_id=($8)
            WHERE id= $9
        `
        const values = [
            data.avatar_url,
            data.name,
            data.species,
            data.sex,
            data.age,
            data.size,
            data.highlights,
            data.owner, //this owner name and not owner_id because it needs to match with the select value in
            data.id
        ]

        db.query(query,values,function(err,results){
            console.log(err)
            console.log(results)
            if(err) throw `index: Database error! ${err}`

            return callback()
        })

    },
    delete(id,callback){
        db.query(`DELETE FROM animals WHERE id=$1`, [id], function(err,results){
            if(err) throw `index: Database error! ${err}`
            
            return callback()
        })
    },

    ownersSelectOptions(callback){
        db.query(`SELECT name, id FROM owners`, function(err,results){
            if(err) throw `select options: db error! ${err}`

            callback(results.rows)
        })
    }
}