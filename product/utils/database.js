const mongoose =  require('mongoose');
require('dotenv').config();

const dbUrl = process.env.DB_URL;


function connectToDB(){

    mongoose.connect(dbUrl).then(() => {
        console.log("Connect to db")
    }).catch(err =>{
        console.log("Error while connecting to database", err);
    })

}


module.exports = connectToDB;

