import express from 'express';
const filterRouter=express.Router();
import myAuthFunction from '../../middlewares/auth/auth.js'

import {Filter} from '../../controllers/utilisateur/filter.js'

filterRouter.get('/filter', myAuthFunction,Filter);
export default filterRouter;