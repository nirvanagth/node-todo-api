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
    //delete many
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result)
    // })

    //delete one
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result)
    // })

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed : false}).then((result) => {
    //     console.log(result)
    // })// get the object back and deleted

    db.collection('Users').deleteMany({name: 'Tianhao'}).then((result) => {
        console.log(result)
    })

    db.collection('Users').findOneAndDelete({_id : new ObjectID('59c3dc6318f7388d8719d663')}).then((result) => {
        console.log(result)
    })
    // db.close()
})