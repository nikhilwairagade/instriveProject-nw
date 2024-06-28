const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const port = process.env.PORT;
const connectToDB = require('./utils/database');


const app = express();
app.use(bodyParser());

connectToDB();

app.use(require('./routes/index'));


app.listen(port, (err) =>{
    if(err) console.log("error while connecting", err);

    console.log("Connected", port)
})


