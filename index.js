import express from 'express';
import dotenv from 'dotenv'
import ConnectDB from './database/db.js';




const app = express();
dotenv.config();



const PORT = 5000;

const USERNAME = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;

ConnectDB(USERNAME, PASSWORD);

app.listen(PORT, () => {
    console.log(`Listening From PORT ${PORT}`)
});
