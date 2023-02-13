import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import dotenv from 'dotenv';



const app = express();

dotenv.config();

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended: true}));
app.use(cors());
app.use('/posts',postRoutes);

// getting port numbers from the .env (dotenv)
const PORT = process.env.PORT || 5000;
mongoose.set('strictQuery', true);
// connection to mongodb

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology:true })
.then(()=> app.listen(PORT,()=> console.log(`server running on port : ${PORT}`)))
.catch((error)=> console.log(error.message))

// for not getting any errors


