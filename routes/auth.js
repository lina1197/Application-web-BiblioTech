import express from 'express';
const authRouter=express.Router();
import {loginValidationRules,loginValidate} from '../middlewares/validators/loginValidator.js';

//calling the functions from the controller
import {register,login} from '../controllers/authController.js'
 
authRouter.post('/register',register);
authRouter.post('/login',loginValidationRules(),loginValidate,login);

export default authRouter;