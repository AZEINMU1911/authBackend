const {Sequelize, DataTypes} = require ('sequelize')

const sequelize = new Sequelize ('postgres://alfikri:6569227alfikri@localhost:5432/authentication-test', {dialect : "postgres"});

sequelize.authenticate().then( () => {
    console.log ('Database connected')
}).catch ((err) => {
    console.log(err)
});

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require ('./userModel')(sequelize,DataTypes)

module.exports = db