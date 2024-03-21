const express = require('express');
const sequelize = require ('sequelize');
const cookieParser = require ('cookie-parser');
const dotenv = require('dotenv').config();
const db = require ('./Models');
const userRoutes = require ('./Routes/userRoutes');
//Setting port
const PORT = 3030;
const app = express();
//Setting middlewares
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser())
//database sync
db.sequelize.sync ({force : true }).then (() => {
    console.log ("Database has beeen synced")
})

//endpoints / api
app.use('/api/users',userRoutes)

app.listen(PORT, () =>{
    console.log(`listening on http://localhost:${PORT}`)
});
