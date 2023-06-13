const express = require('express')
const morgan = require ('morgan')
const session = require('express-session')
const bodyParser = require('body-parser')
const colors = require('colors')
const { horsesRouter } = require('./routes/horsesRouter')

//App Config
const app = express()
const PORT = process.env.PORT || 5000

//Middleware
    //Morgan
app.use(morgan('tiny'))
    //Body Parser
app.use(bodyParser.json())
    //Sessions
const store = new session.MemoryStore()
app.use(session({
    secret:'DJ56987Jkl!@568',
    resave: false,
    saveUninitialized:false,
    store,
    cookie:{
        maxAge:86400000,
        secure:true,
        sameSite:"none"
      }
}))
//Routes   
app.use('/horses', horsesRouter)   



//Error Handler
app.use((err, req, res, next)=>{
   
    if(!err.status){
        err.status = 500
    }
    if(!err.message){
        err.message = "Oh No! You found a problem. Please try again."
    }
    console.error(`${err.status}-${err.message}`.red)
    res.status(err.status).send(err.message)
})

//Open Connection
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})

