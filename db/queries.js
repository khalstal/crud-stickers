const knex = require("./knex"); //the connection to db

module.exports = {
    getAll() {
        return knex('sticker');
    }
}

 