import Emprunt from "../../models/Emprunt.js";

export async function getHistorique(req,res){
try {
const emprunts=await Emprunt.find({utilisateur:req.body.utilisateur });
return res.status(200).send(emprunts);

} catch(error){
    return res.status(500).send(error);
}
}