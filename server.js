const express = require ('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

//Require Notes routes
require('./app/routes/note.routes')(app);

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url)
    .then(() => {
        console.log('successfully connected to the database');
    }).catch(err => {
        console.log('could not connect to the database. Exiting now ...');
        process.exit();
});

app.get('/', (req, res) =>{
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of your notes."})
});

app.listen(3000, () =>{
    console.log('server is listening at port 3000');
});