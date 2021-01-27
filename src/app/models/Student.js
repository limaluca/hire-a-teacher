const { response } = require('express')
const db = require('../../config/db')

const { age, schooling, date } = require('../../lib/utils')


module.exports = {
    all(callback) {
        db.query(`SELECT * FROM students`, function(err, results) {
            if (err) throw "Database error!"
            callback(results.rows)

        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO students (
                avatar_url,
                name,
                email,
                birth_date,
                school_year,
                study_hours,
                teacher_id
            ) VALUES ($1,$2,$3,$4,$5,$6,$7)
            RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth_date).iso,
            data.school_year,
            data.study_hours,
            data.teacher_id

        ]


        db.query(query, values, function(err, results) {
            if (err) throw "database error"

            callback(results.rows[0])
        })
    },

    find(id, callback) {
        db.query(`
        SELECT * 
        FROM students 
        WHERE id =$1`, [id], function(err, results) {
            if (err) throw "Database error.."

            callback(results.rows[0])
        })
    },

    update(data, callback) {
        const query = `
            UPDATE students SET
            avatar_url=($1),
            name=($2),
            email=($3),
            birth_date=($4),
            school_year=($5),
            study_hours=($6),
            teacher_id=($7)
            WHERE id = $8
        `


        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth_date).iso,
            data.school_year,
            data.study_hours,
            data.teacher_id,
            data.id
        ]


        db.query(query, values, function(err, results) {
            if (err) throw "Db error"

            callback()
        })
    },

    delete(id, callback) {
        db.query(`
            DELETE FROM students WHERE id = $1`, [id], function(err, results) {
            if (err) throw `DB Error! ${err}`

            return callback()
        })

    },

    teachersSelectOptions(callback) {
        db.query(`SELECT name, id FROM teachers`, function(err, results) {
            if (err) throw "database error"

            callback(results.rows)
        })
    }
}