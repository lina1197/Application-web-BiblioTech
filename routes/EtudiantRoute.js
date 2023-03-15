import express from 'express'; 
const etudiantRouter=express.Router();
import { getAverage } from '../controllers/Etudiant.js';
etudiantRouter.post('/average',getAverage);
export default etudiantRouter;