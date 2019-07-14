const {OrderedMap} = require('immutable');
const {ObjectID} = require('mongodb');
const {_} =require('lodash');

class Connection{

    constructor(app){
        this.app = app;
        this.clients = new OrderedMap();
        this.socketServerConnect();
    }
    getClients(){
        return this.clients;
    }


    addClient(id, client){
        this.clients = this.clients.set(id,client);

    }
    getClient(index){
        return this.clients[index];
    }
    removeClient(id){
        this.clients = this.clients.remove(id);
    }


    socketServerConnect(){
        const app = this.app;
        app.wss.on('connection', (ws) => {

            console.log('RaspberryPi is connected');

            //add this Pi to clients collections.
            const clientId = new ObjectID().toString();

            ws.on('message', (msg)=>{

                console.log('Message received from RaspberryPi is ',msg);


            });

            //ws.send("ho");

            const newClient ={
                _id:clientId,
                ws: ws,
                created: new Date()
            };

            this.addClient(clientId,newClient);


            ws.on('close', ()=>{
               console.log(`RaspberryPi camera with Id ${clientId} is disconnected`);
               this.removeClient(clientId);

            });

            //const commandNeedToSendToPi = {action: 'stream',payload:true};
            // ws.send(JSON.stringify(commandNeedToSendToPi));

        });

    }


}

exports.connection =  Connection;