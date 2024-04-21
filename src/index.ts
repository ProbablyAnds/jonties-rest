import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import compression from 'compression';
import cors from 'cors'; // Cross-Origin Resource Sharing
import mongoose from 'mongoose';

import router from './router/globalRouter';

const app = express();
app.use(cors({
    credentials: true,
}));

app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log("Server running on http://localhost:8080/");
});

const MONGODB_URL = "mongodb+srv://andrewcodnerwork:lpd0z62LGcMASpGd@jonties-db.mxu0djr.mongodb.net/";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URL);
mongoose.connection.on('error', (error: Error) => {
    console.log(error);
})

app.use('/', router());

