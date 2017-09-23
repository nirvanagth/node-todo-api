require('./config/config')

const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User} = require('./models/users')
var {authenticate} = require('./middleware/authenticate')

var app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json()) //middleware parse request body

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    })

    todo.save().then((doc) => {
        res.send(doc)
    }, (e) => {
        res.status(400).send(e)
    })

})

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        })
    }, (e) => {
        res.status(400).send(e)
    })

})

// GET /todos/1234535
app.get('/todos/:id', (req, res) => {
    var id = req.params.id

    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send() //return to stop the function
        }
        res.send({ //send back the todo
            todo
        })
    }).catch((e) => {
        res.status(400).send()
    })
})


app.delete('/todos/:id', (req, res) => {
    var id = req.params.id

    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send()
        }
        res.status(200).send({
            todo
        })
    }).catch((e) => {
        res.status(400).send()
    })

})


app.patch('/todos/:id', (req, res) => {
    var id = req.params.id
    var body = _.pick(req.body, ['text', 'completed']) //subset of objects users can uodate

    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime()
    } else {
        body.completed = false
        body.completedAt = null
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send()
        }
        res.send({todo})
    }).catch((e) => {
        res.status(400).send()
    })

})

// POST /users sign up route
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password'])
    var user = new User(body)

    user.save().then((user) => {
        return user.generateAuthToken()
        // res.send(user)
    }).then((token) => {
        res.header('x-auth', token).send(user) //set response header (key, value)
    }).catch((e) => {
        res.status(400).send(e)
    })

})



app.get('/users/me', authenticate ,(req, res) => { //authenticate as middleware
    res.send(req.user)

})
app.listen(port, () => {
    console.log(`Started on port ${port}`)
})

module.exports = {
    app
}