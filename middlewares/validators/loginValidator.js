import {body,check,validationResult} from 'express-validator';
import Utilisateur from '../../models/Utilisateur.js';
import bcrypt from'bcrypt';

export const loginValidationRules=()=>{
    return [
        body('password').not().isEmpty(),
        body('email').isEmail(),
        body('email').custom(value=>{
            return Utilisateur.findOne ({email:value}).then(utilisateur=>{
                if(!utilisateur){
                    return Promise.reject('Email is not registered');
                }
            })
        })
    ]
}

export const loginValidate=(req,res,next)=>{
    const errors=validationResult(req)
    if(errors.isEmpty()){
        return next()
    }
    const extractedErrors=[]
    errors.array().map(err=>extractedErrors.push({[err.param]:err.msg}))
    return res.status(422).json({
        errors:extractedErrors,
    })
}


