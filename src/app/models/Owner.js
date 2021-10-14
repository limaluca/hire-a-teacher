const db = require("../../config/db")

module.exports = {
    all(callback){
        db.query(`SELECT owners.* , COUNT(animals) AS total_Animals
        FROM owners
        LEFT JOIN animals ON (animals.owner_id = owners.id)
        GROUP BY owners.id`, function(err,results){
            if(err) throw `index: Database error! ${err}`
         
            callback(results.rows)
        })

    },
    create(data, callback){
        const query = `
            INSERT INTO owners (
                avatar_url,
                name,
                sex,
                phone,
                highlights
            ) VALUES($1,$2,$3,$4,$5)
            RETURNING id
        `
        
        
        const values = [
            data.avatar_url,
            data.name,
            data.sex,
            data.phone,
            data.highlights
        ]

        db.query(query,values, function(err,results) {
            console.log(err)
            console.log(results)

            if(err) throw `create: Database error! ${err}`
            
            return callback(results.rows[0])
        })

    },
    find(id,callback){
        db.query(`SELECT * FROM owners WHERE id=$1`, [id], function(err,results){
            if(err){
                console.log("Find: Database error!")
                return
            }
            return callback(results.rows[0])
        })
    },
    update(data,callback){
        const query =`
            UPDATE owners SET 
            avatar_url=($1),
            name=($2),
            sex=($3),
            phone=($4),
            highlights=($5)
            WHERE id= $6
        `
        
        const values = [
            data.avatar_url,
            data.name,
            data.sex,
            data.phone,
            data.highlights,
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
        db.query(`DELETE FROM owners WHERE id=$1`, [id], function(err,results){
            if(err) throw `index: Database error! ${err}`
            
            return callback()
        })
    }
}