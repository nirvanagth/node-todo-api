var env = process.env.NODE_ENV || 'development'


if (env === 'development' || env === 'test') {
    var config = require('./config.json') //this is a javascript object
    var envConfig = config[env] //if want to use a variable to access a property, need to use []
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key]
    })

}
//only development and test environment variables are stored in file.
// production environment variables get configured via Heroku commandline tool or Heroku web application
// if (env === 'development') {
//     process.env.PORT = 3000
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'
// } else if (env === 'test') {
//     process.env.PORT = 3000
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
// }