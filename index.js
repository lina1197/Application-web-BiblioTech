import express, { urlencoded } from 'express';
import bcrypt from 'bcrypt'; 
import 'dotenv/config';
// import path from 'path';

// const __dirname = path.dirname(new URL(import.meta.url).pathname);



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
import livreRouter from './routes/employée/livre.js';
import filterRouter from './routes/utilisateur/Filter.js'
import empruntRouter from './routes/employée/emprunt.js';
import catalogueRouter from './routes/utilisateur/Catalogue.js';
import commentRouter from './routes/utilisateur/CommentRouter.js';
import replyRouter from './routes/utilisateur/ReplyRouter.js';
import historiqueRouter from './routes/utilisateur/HistoriqueRouter.js';
import statisticsRouter from './routes/employée/statistics.js';
app.use('/employe/categorie', catégorieRouter);
app.use('/employe/livre', livreRouter);
app.use('/employe/livre', empruntRouter);
app.use('/employe/statistics',statisticsRouter);
app.use('/utilisateur/livre',filterRouter);
app.use('/utilisateur/livre',catalogueRouter);
app.use('/utilisateur/livre',commentRouter);
app.use('/utilisateur/livre',replyRouter);
app.use('/utilisateur/emprunts',historiqueRouter);


