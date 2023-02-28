import express, { urlencoded } from 'express';
import bcrypt from 'bcrypt'; 
import dotenv from 'dotenv';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

//dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: 'C:/Users/BNP%20FORMATION/Desktop/BiblioTech/.env' });

console.log(process.env.PRIVATE_KEY)


const app=express();
const port = 3000;
//built-in middleware for json
app.use(express.json());
//built-in middleware  to handle url encoded data
//in other words, form data
// 'content-type:application/x-www-form-urlencoded'
app.use(express.urlencoded({extended:false}));
import connectDB from './config/dbConnect.js';
connectDB();
app.listen(port, () => {
console.log(`Server started on port ${port}`);
});
import authRouter from './routes/auth.js'
app.use('/auth', authRouter);
import catégorieRouter from './routes/employée/catégorie.js';
app.use('/employe/categorie', catégorieRouter);
