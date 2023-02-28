import express from 'express';
const catégorieRouter=express.Router();
//calling the middlewares
import myAuthFunction from '../../middlewares/auth/auth.js'
import verifyRole from '../../middlewares/auth/utilisateur.js';
import {createCategory} from '../../controllers/employée/categoryController.js';
catégorieRouter.post('/create',myAuthFunction, verifyRole,createCategory);
export default catégorieRouter;