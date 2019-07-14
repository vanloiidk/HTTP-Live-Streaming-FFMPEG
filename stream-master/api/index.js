const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const _ = require('lodash');
const {Server} = require('uws');
const {connection} = require('./connection');
const {routers} = require('./router');
const {connect} = require('./db');
const {dbname} = require('./config');
const Model = require('./models/index');
const cors = require('cors');



const PORT = 3001;
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({exposedHeaders: '*'}));



app.server = http.createServer(app);

//setup websocket Server
app.wss  = new Server({server: app.server});

app.connections = new connection(app);
app.routers = routers(app);


//connect to mongodb
connect((err, client)=>{

    if(err){
        throw err;
    }
    app.db =client.db(dbname);
});

// Set up models
app.models = new Model(app);




//start server
app.server.listen(PORT,()=>{
    console.log(`Server is running on: http://localhost:${PORT}`);

});

