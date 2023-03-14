import express from 'express'; 
const replyRouter=express.Router();

import { addReply, deleteReply } from '../../controllers/utilisateur/comment.js';
import myAuthFunction from '../../middlewares/auth/auth.js';
replyRouter.post('/reply', myAuthFunction, addReply);
replyRouter.delete('/reply/:id', myAuthFunction, deleteReply)
export default replyRouter;