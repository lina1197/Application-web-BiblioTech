import Utilisateur from '../models/Utilisateur.js';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'; 
//const PRIVATE_KEY = process.env.PRIVATE_KEY;

const PRIVATE_KEY = '8f207d8c02fabf4485e3aa5aaab4d1f3635ac5a716a8f2016668d24599f85b3b2cfbf26425a06c7548a9ca2aabb8f8b773bc92e82f0be502a7217f41989fd5c1';

export async function register (req,res, next) {
    try {
     //get the form data 
     const {name, email, password, role} =req.body;
     //hash the password
     let encryptedPassword=await bcrypt.hash(password,10) 
     //validate the data and creating new user

     const utilisateur= await Utilisateur.create({
     name,
     email:email.toLowerCase(),
     password:encryptedPassword,
     role,   
     })
     let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bibliotech2.23@gmail.com',
        pass: 'fczsxetjtxrikesy'
    }
});
 
let mailDetails = {
    from: 'bibliotech2.23@gmail.com',
    to: 'email',//to test you can input your personal email 
    subject: 'Test mail',
    text: 'Welcome to my app.'
};
 
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully');
    }
});

     //sending success message
     res.status(200).json({
        success:true,
        message:"user registered successfully",
        utilisateur:utilisateur,
     });
    } catch (error){
     //sending error message
     console.log(error)
     res.status(400).json({
        message:"user register failed",
        error,
     });
    }
};

export async function login (req,res, next) {
    try {
     //get the form data
     const {email,password}=req.body;

     //get user data by email
     let utilisateur=await Utilisateur.findOne({email:email}) 

     //compare user password with the hashed one
     let isMatch= await bcrypt.compare(req.body.password,utilisateur.password);

     //send error message if passwords are not matched
     if(!isMatch){
        return res.status(401).json({
        error:"incorrect email or password"    
        });
     }

     //creating access token via JWT and save it in the user collection
     let token=jwt.sign({_id:utilisateur._id, email:utilisateur.email},PRIVATE_KEY)
     utilisateur.token=token
     await utilisateur.save({validateModifiedOnly:true,});
     utilisateur.password='';

     //send the login data
     res.status(200).json({
     success:true,
     utilisateur:utilisateur   
     });

    } catch (error){
    //sending error message
    console.log(error)
    res.status(400).json({
        message:"user login failed",
        err:error,
    })    
     
    }
};