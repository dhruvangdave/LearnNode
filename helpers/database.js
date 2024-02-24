const mysql = require('mysql2');

const pool = mysql.createPool({
   hostname: 'mysql',
   user: 'root',
   database: 'learn-node',
   password: 'test',
   port: 8090
});

module.exports = pool.promise();