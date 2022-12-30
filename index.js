import express from 'express';
import dotenv from 'dotenv';
import router from './routes/openaiRoutes.js';
import path from 'path';

const __dirname = path.resolve();
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
app.use('/openai', router);

app.listen(PORT, () => {
    console.log('Listening')
});


