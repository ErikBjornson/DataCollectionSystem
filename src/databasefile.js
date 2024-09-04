const { Pool } = require('pg');

const pool = new Pool({
    user: '',
    host: '',
    database: '',
    password: '',
    port: 5432
});

pool.connect();

module.exports = {
    query : (text, params, callback) => {
        return pool.query(text, params, callback);
    }
};
