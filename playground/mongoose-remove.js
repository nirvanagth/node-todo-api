const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/users')


// 3 method to remove documents
Todo.remove({}).then((result) => {
    console.log(results)
})

Todo.findOneAndRemove({_id: '59c5e0060d518d9b92d1a97c'}).then((todo) => {
    console.log(todo)
})



Todo.findByIdAndRemove('59c5e0060d518d9b92d1a97c').then((todo) => {
    console.log(todo)
})