import express from 'express';
import cors from 'cors';
import { routerApi } from './routes'; 
import morgan from 'morgan';
import { config } from './config/config';

const app = express();
app.set('port', config.port);

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.get('/test', (req, res) => {res.status(200).json({message: "successfully"})});

routerApi(app);

app.listen(app.get('port'));
console.log("Listen on port", app.get('port'));