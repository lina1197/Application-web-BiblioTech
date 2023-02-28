import jwt from 'jsonwebtoken';
const PRIVATE_KEY = '8f207d8c02fabf4485e3aa5aaab4d1f3635ac5a716a8f2016668d24599f85b3b2cfbf26425a06c7548a9ca2aabb8f8b773bc92e82f0be502a7217f41989fd5c1';
import Utilisateur from '../../models/Utilisateur.js';

const myAuthFunction= async(req,res,next) =>{
try {
const token = req.headers.authorization.split(" ")[1];
//let Utilisateur = jwt.verify(token, PRIVATE_KEY);
//let UtilisateurX = await Utilisateur.findById(Utilisateur._id).select('-password');
    let decodedToken = jwt.verify(token, PRIVATE_KEY);

  let UtilisateurX = await Utilisateur.findOne({ _id: decodedToken._id }).select('-password');
req.Utilisateur = UtilisateurX;
next();

} catch(error){
    console.log("auth error", error);
    res.status(401).json({
      message: "authentication failed",
      error: error
    });
}


}
export default myAuthFunction;