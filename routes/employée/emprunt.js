import express from 'express';
const empruntRouter=express.Router();
//calling the middlewares
import myAuthFunction from '../../middlewares/auth/auth.js'
import verifyRole from '../../middlewares/auth/utilisateur.js';
import { AddRental,UpdateRental } from '../../controllers/employée/EmpruntController.js';
// empruntRouter.post('/AddRental/:id',myAuthFunction, verifyRole,AddRental);
empruntRouter.post('/AddRental',myAuthFunction, verifyRole,AddRental);
empruntRouter.post('/UpdateRental/:id',myAuthFunction, verifyRole,UpdateRental)
export default empruntRouter;