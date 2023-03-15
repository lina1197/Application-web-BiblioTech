import express, { urlencoded } from 'express';
import 'dotenv/config';
import nodemailer from 'nodemailer';




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
import etudiantRouter from './routes/EtudiantRoute.js';

app.use('/employe/categorie', catégorieRouter);
app.use('/employe/livre', livreRouter);
app.use('/employe/livre', empruntRouter);
app.use('/employe/statistics',statisticsRouter);
app.use('/utilisateur/livre',filterRouter);
app.use('/utilisateur/livre',catalogueRouter);
app.use('/utilisateur/livre',commentRouter);
app.use('/utilisateur/livre',replyRouter);
app.use('/utilisateur/emprunts',historiqueRouter);
app.use('/etudiant',etudiantRouter);

const pwd=process.env.pwd;
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bibliotech2.23@gmail.com',
        pass: pwd
    }
});
 
let mailDetails = {
    from: 'bibliotech2.23@gmail.com',
    to: '', //you can put your personal email between '' to test
    subject: 'Test mail',
    text: 'node mailer test is successfull.'
};
 
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully');
    }
});