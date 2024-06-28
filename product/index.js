const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const error = require('./middleware/error');
require('dotenv').config();
const bodyParser = require('body-parser');

const port = process.env.PORT;
const connectToDB = require('./utils/database');


const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

app.use(bodyParser());

connectToDB();

app.use(require('./routes/index'));
app.use(error);


app.listen(port, (err) =>{
    if(err) console.log("error while connecting", err);

    console.log("Connected", port)
})


