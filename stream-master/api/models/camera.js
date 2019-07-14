const _ = require('lodash');
const {ObjectID} = require('mongodb');
const {OrderedMap} = require('immutable');


class Camera {

    constructor(app) {
        this.app = app;

        this.cameras = new OrderedMap();
    }


    find(q, options, cb = () => {}){



        this.app.db.collection('camera').find(q, options).limit(100).toArray((err, results)=>{
        //     results.forEach(function (ell) {
        //
        //     });

            return cb(err ? "Not found": null, results);

        });

    }
    addCameraToCache(id, camera){

        if(typeof id !== 'string'){
            id = _.toString(id);
        }
        this.cameras = this.cameras.set(id, camera);
    }


    create(obj, cb = () => {
    }) {
        const connections = this.app.connections.getClients();

        const name = _.get(obj, 'name', null);
        let userId = _.get(obj, 'userId', null);

        console.log(name);
        console.log('number connection: ',connections.size);
        connections.forEach(function (ell) {
            console.log(ell);
            console.log('get id', _.get(ell,'_id',''))

        });


        if (!userId) {

            return cb("Camera owner is required", null);
        }

        if (!name) {

            return cb("Camera name is required", null);
        }


        if(typeof userId === 'string'){

            userId = new ObjectID(userId);
        }
        const isPublic = _.get(obj, 'public', false);

        const streamingKey = new ObjectID().toString();

        const camera = {
            name: `${_.get(obj, 'name', '')}`,
            userId: userId,
            public: isPublic ? true : false,
            live: false,
            streamingKey: streamingKey,
            lastConnected: null,
            isConnected: false,
            created: new Date(),

        }

        this.app.db.collection('camera').insertOne(camera, (err, info) => {


            if(err){

                return cb("An error inserting new camera", null);
            }

            // save camera to cache

            this.addCameraToCache(camera._id, camera);

            return cb(null, camera);
        });

    }

}
module.exports = Camera;