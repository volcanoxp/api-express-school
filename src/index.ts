import express from 'express';
import cors from 'cors';
import { routerApi } from './routes'; 
import morgan from 'morgan';

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.get('/test', (req, res) => {res.send("Test")});

routerApi(app);

app.listen(3001);
console.log("Listen on port 3001");