import express from 'express'; 
const catalogueRouter=express.Router();
import myAuthFunction from '../../middlewares/auth/auth.js'
import {catalogue} from '../../controllers/utilisateur/catalogue.js'
catalogueRouter.get('/catalogue', myAuthFunction,catalogue);
export default catalogueRouter;