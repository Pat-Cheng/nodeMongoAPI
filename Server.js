const express = require('express');
const bodyParser = require('body-parser');
const port = 3000

//create express app
const app = express();

//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//parse requests of content-type - application/json
app.use(bodyParser.json());

//db configurations
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//connect to the db
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the databse. Exiting now...', err);
    process.exit();
});

//simple route when app is run by node Serve.js
app.get('/', (req, res) => {
   res.json({"message": "Welcome to the EasyInventory API"});
});

require('./app/routes/inventory.routes.js')(app);

//listen for requests
app.listen(port, () => {
    console.log("Server is listening on port 3000");
});