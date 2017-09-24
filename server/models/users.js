const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')

var UserSchema = new mongoose.Schema({
    email: {
        require: true,
        trim: true,
        minlength: 1,
        type: String,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6,

    },
    //sent back from login or sign up req, client use this token to authenticate other request
    // pass along as header, make that call success after authenticating
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
})

//override
//determine what items that can be returned when a mongoose model is converted into a JSON value
UserSchema.methods.toJSON = function () { // it is an instance method
    var user = this
    var userObject = user.toObject()

    return _.pick(userObject, ['_id', 'email'])
}

// add token to individual user document, save that and return the token to client
//arrow function does not bind this keyword
UserSchema.methods.generateAuthToken = function () {
    var user = this
    var access = 'auth'
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'somesecret').toString()

    user.tokens.push({
        access,
        token
    })

    return user.save().then(() => {
        return token
    })
}

UserSchema.methods.removeToken = function (token) {
    var user = this

    return user.update({
        $pull: {
            tokens: {
                token: token
            }
        }
    })
}

//custom model method, take tht jwt token user sends and one of their secure request
//we will find the individual user and we will return that user to the caller
UserSchema.statics.findByToken = function (token) { // this is an model method
    var User = this
    var decoded   //

    try {
        decoded = jwt.verify(token, 'somesecret')
    } catch (e) {
        // return new Promise((resolve, reject) => { //if err, promise will be return by findByToken
        //     reject()
        // })
        return Promise.reject()
    }
    //if success, query nested object properties
    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}

UserSchema.statics.findByCredentials = function (email, password) {
    var User = this
    return User.findOne({email}).then((user) => {
        if (!user) { // case user not exist
            return Promise.reject()
        }

        return new Promise((resolve, reject) => {
            // use bcrypt.compare to compare password and user.password
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user)
                } else {
                    reject()
                }
            })
        })
    })
}

UserSchema.pre('save', function (next) { //middleware
    var user = this

    if (user.isModified('password')) {
        //user.password
        //user.password = hash?
        //next
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

var User = mongoose.model('User', UserSchema)


module.exports = {
    User
}