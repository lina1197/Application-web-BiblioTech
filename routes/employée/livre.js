import express from 'express';
const livreRouter=express.Router();
//calling the middlewares
import myAuthFunction from '../../middlewares/auth/auth.js'
import verifyRole from '../../middlewares/auth/utilisateur.js';
import {AddBook} from '../../controllers/employée/livreController.js';

livreRouter.post('/AddBook',myAuthFunction, verifyRole,AddBook);
export default livreRouter;