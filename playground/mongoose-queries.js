const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/users')
// var id = '59c532afa4351398b572576c'
//
// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid')
// }
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos)
// })
//
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo)
// })

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found')
//     }
//     console.log('Todo By Id', todo)
// }).catch((e) => {
//     console.log(e)
// })

var userid = '59c4b828749a0892b6d71289'
User.findById(userid).then((user) => {
    if (!user) {
        return console.log('User ID not found')
    }
    console.log('User by ID', user)
}).catch((e) => {
    console.log(e)
})