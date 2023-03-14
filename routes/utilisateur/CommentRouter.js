import express from 'express'; 
const commentRouter=express.Router();
import myAuthFunction from '../../middlewares/auth/auth.js';
import { addComment,deleteCommentAndItsReplies } from '../../controllers/utilisateur/comment.js';
commentRouter.post('/comment', myAuthFunction, addComment);
commentRouter.delete('/comment/:id', myAuthFunction, deleteCommentAndItsReplies);
export default commentRouter;