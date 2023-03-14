import express from 'express'; 
const historiqueRouter=express.Router();
import myAuthFunction from '../../middlewares/auth/auth.js';
import { getHistorique } from '../../controllers/utilisateur/historique.js';

historiqueRouter.get('/historique', myAuthFunction, getHistorique);
export default historiqueRouter;