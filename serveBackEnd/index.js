import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import { fileURLToPath } from 'url'
import { dirname,join } from 'path'
import root from './routes/main.js'
import cookieParser from "cookie-parser"
import error from "./middleware/error.js"
import routeInstitute from './routes/institute.js'
import dbConnection from './config/dbConnection.js'
import { logger, eventLogs } from './middleware/logger.js'
import core from './config/continuousOperatingReference.js'

//Configuration on dot env file for setting up a environment for database.
dotenv.config();

const app = express()
app.use(logger) //function for logging web app log into the logs directories
app.use(cors(core)) //implementation of cors policy to block or allow access
app.use(express.static('public')) //declaration of entrypoint directoyr file
app.use('/',root); //declaration of routes path
app.use('/institution', routeInstitute);
app.use(express.json())
app.use(cookieParser())
dbConnection()

const PORT = process.env.port || 8800

//Usage of filename and dirname to convert plain js into es6 module.
//Necessary to define path later on

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/", (req,res)=>{
    res.json("Response Given")
})

//Function for handling requests fo error requests
app.all('*',(req,res) => {
    res.status(404)
    if(req.accepts('html')){
        const viewPath = join(__dirname, '.', 'view', 'Error.html');
        res.sendFile(viewPath)
    }
    else if(req.accepts('json')){
        res.json({message: '404 Not found'})
    }
    else{
        res.type('txt').send('404 not found')
    }
})

app.use(error)

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDb.")
    app.listen(PORT, ()=>{
        console.log("Connected to Server")
    })
})

mongoose.connection.on('error', errors => {
    console.log(errors)
    eventLogs(`${errors.no}: ${errors.code}\t${errors.syscall}\t${errors.hostname}`, 'mongoErrorLogs.log')
})


