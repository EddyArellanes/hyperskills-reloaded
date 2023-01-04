//import 'module-alias/register';
import * as express from "express"
import * as morgan from "morgan"
import * as cors from 'cors'
import * as dotenv from 'dotenv'
import {createConnection} from 'typeorm';
//import walletRoutes from './routes/wallet.routes'
//import * as bodyParser from 'body-parser'

const corsOptions = { origin: '*'}
const app = express()


dotenv.config()

app.set('port', process.env.PORT || 4001)

//Set Cors for Allow Cross Origin Requests
app.use( cors( corsOptions))
//Middlewares
app.use( morgan('dev'))
//express.json before was apart package called body-parserzz
//app.use( bodyParser.urlencoded({ extended: false }))
app.use( express.json())

//Static Files
app.use(express.static(__dirname + '/public/'))

//Routes
/*
if(process.env.NODE_ENV !== 'production'){
  app.get("*", function( req, res){
    res.redirect(302, 'https://' + req.hostname + req.originalUrl);
  });
}
*/
//It would be fine if will possible iterate and set up this
app.use('/api/v1/hyperskills/skill', require('./routes/HyperSkills/skill'))
app.use('/api/v1/hyperskills/entity', require('./routes/HyperSkills/entity'))
app.use('/api/v1/hyperskills/task', require('./routes/HyperSkills/task'))
app.use('/api/v1/hyperskills/utils', require('./routes/HyperSkills/utils'))
//app.use(walletRoutes);


export default app

