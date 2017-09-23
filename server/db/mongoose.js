const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', {useMongoClient: true})

module.exports = {
    mongoose
}
//save new something


// var newTodo = new Todo({
//     text: 'Something to do'
// })
//
// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc)
// }, (e) => {
//     console.log('Unable to save todo')
// })
//
// //User {email - require, trim, type, minlength}
//
//
// var newUser = new User({
//     email: 'nirvanagth@gmail.com'
// })
//
// newUser.save().then((doc) => {
//     console.log(doc)
// }, (e) => {
//     console.log('Unable to save user', e)
// })