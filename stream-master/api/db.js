const {MongoClient} = require('mongodb');
const {mongodbUrl,dbname} = require('./config');

exports.connect = (cb)=>{

    //Mongodb version 2
        MongoClient.connect(mongodbUrl, (err, client)=>{
            return cb(err, client);
        });
};