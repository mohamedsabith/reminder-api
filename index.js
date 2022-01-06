const express = require('express')
const cors=require('cors')
const dataService=require('./services/dataService')
const jwt = require('jsonwebtoken')


const app = express()
//parse json
app.use(express.json())

//use cors
app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}))

//jwt middleware
const jwtMiddleware = (req, res, next) => {
    try {
        //console.log(req);
        //fetching token from request header
        const token = req.headers["x-access-token"]
        //token validation
        const data = jwt.verify(token, 'supersecretkey123456')
        req.currentUid = data.currentUserid
        next()
    }
    catch {
        res.json({
            status: false,
            statusCode: 401,
            message: "PLEASE LOG IN !!!"
        })
    }
}

//register API
app.post('/register', (req, res) => {
    dataService.register(req.body.email, req.body.username, req.body.userid,req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

//login API
app.post('/login', (req, res) => {
   dataService.login(req.body.userid, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

//event API
app.post('/addEvent',jwtMiddleware,  (req, res) => {
    dataService.addEvent(req,req.body.userid, req.body.tittle,req.body.date,req.body.event)
        .then(result => {
            res.status(result.statusCode).json(result)
        })

})

//Show event API
app.post('/showEvent',jwtMiddleware,  (req, res) => {
    dataService.showEvent(req.body.userid)
        .then(result => {
            res.status(result.statusCode).json(result)
        })

})

app.listen(7000,()=>{
    console.log('Node.js web server at port 7000 is running..')
})