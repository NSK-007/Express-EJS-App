// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host:'localhost',
//     user: 'root',
//     database: 'node-complete',
//     password: '@Rgukt123'
// });

// module.exports = pool.promise();

const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-complete', 'root', '@Rgukt123', {
    dialect : 'mysql',
    localhost : 'localhost'
});

module.exports = sequelize;