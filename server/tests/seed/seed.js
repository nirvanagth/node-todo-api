const {ObjectID} = require('mongodb')
const jwt = require('jsonwebtoken')

const {Todo} = require('./../../models/todo')
const {User} = require('./../../models/users')

const userOneId = new ObjectID()
const userTwoId = new ObjectID()
const users = [{
    _id: userOneId,
    email: 'tianhao@example.com',
    password: 'useronepass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
}, {
    _id: userTwoId,
    email: 'nirvana@gmail.com',
    password: 'usertwopass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]

}]
const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneId
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 232323,
    _creator: userTwoId
}]

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos)
    }).then(() => {
        done()
    })
}

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save()
        var userTwo = new User(users[1]).save()

        return Promise.all([userOne, userTwo])
    }).then(() => {
        done()
    })
}

module.exports = {
    todos,
    users,
    populateTodos,
    populateUsers
}