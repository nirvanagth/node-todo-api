// const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')

// var obj = new ObjectID()
// console.log(obj)
// var user = {name: 'Tianhao', age: 25} //ES6 deconstruct variable
// var {name} = user
// console.log(name)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.')
    }
    console.log('Connected to MongoDB server')

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     complete: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err)
    //     }
    //
    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // })

    //Insert new doc into Users (name, age, location)
    // db.collection('Users').insertOne({
    //     name: 'Tianhao',
    //     age: 26,
    //     location: 'Fremont'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert User', err)
    //     }
    //     console.log(result.ops[0]._id.getTimestamp())
    // })
    db.close()
})