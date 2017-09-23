var express = require('express')
var bodyParser = require('body-parser')
var {ObjectID} = require('mongodb')

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {users} = require('./models/users')

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
app.listen(port, () => {
    console.log(`Started on port ${port}`)
})

module.exports = {
    app
}