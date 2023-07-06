import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import { fileURLToPath } from 'url'
import { dirname,join } from 'path'
import root from './routes/main.js'
import cookieParser from "cookie-parser"
import error from "./middleware/error.js"
import dbConnection from './config/dbConnection.js'
import { logger, eventLogs } from './middleware/logger.js'
import core from './config/continuousOperatingReference.js'


dotenv.config();

const app = express()
app.use(logger)
app.use(cors(core))
app.use(express.static('public'))
app.use('/',root);
app.use(express.json())
app.use(cookieParser())
dbConnection()

const PORT = process.env.port || 8800
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/", (req,res)=>{
    res.json("Response Given")
})

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


