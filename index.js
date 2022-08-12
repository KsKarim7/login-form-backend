import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import bodyParser from 'body-parser';

import ConnectDB from './database/db.js';
import Router from './route.js'

const app = express();
dotenv.config();

// const router = express.Router();
// router.post('/signup', userSignup);

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);



const PORT = 5000;

const USERNAME = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;

ConnectDB(USERNAME, PASSWORD);

app.listen(PORT, () => {
    console.log(`Listening From PORT ${PORT}`)
});
