// const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.')
    }
    console.log('Connected to MongoDB server')

    db.collection('Todos').findOneAndUpdate({ //mongodb nodejs driver api
        _id: new ObjectID('59c476015de7ab31fb4bfd92')
    }, {
        $set: { // mongodb update operator
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result)
    })

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('59c3db643f399e8d81b13512')
    }, {
        $set: {
            name: 'Tianhao'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result)
    })
    // db.close()
})