//setting database using sequelize and postgres
const {Sequelize, DataTypes} = require ('sequelize')

//postgres://<user>:<password>@localhost:<port>/<database_name>
const sequelize = new Sequelize ('postgres://alfikri:6569227alfikri@localhost:5432/authentication-test', {dialect : "postgres"});

//check if everything is working
sequelize.authenticate().then( () => {
    console.log ('Database connected')
}).catch ((err) => {
    console.log(err)
});

//exporting db
const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require ('./userModel')(sequelize,DataTypes)

module.exports = db