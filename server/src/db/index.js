const { Pool } = require("pg");

const pool = new Pool({
    user: "elmer",
    host: "localhost",
    database: "wms",
    password: "",
    port: 5432
});

module.exports = {
    query: (text, params) => pool.query(text, params),
}
