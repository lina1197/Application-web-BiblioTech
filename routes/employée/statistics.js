import express from 'express';
const statisticsRouter=express.Router();
//calling the middlewares
import myAuthFunction from '../../middlewares/auth/auth.js'
import verifyRole from '../../middlewares/auth/utilisateur.js';
import {getStatistics} from '../../controllers/employée/Statistics.js';

statisticsRouter.get('/retrieveStatistics',myAuthFunction, verifyRole,getStatistics);
export default statisticsRouter;