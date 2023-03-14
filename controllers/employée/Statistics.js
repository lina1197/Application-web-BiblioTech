import Utilisateur from "../../models/Utilisateur.js";
import Emprunt from "../../models/Emprunt.js";
import Livre from "../../models/Livre.js";
export async function getStatistics(req,res){
try {
const Emprunts=await Emprunt.find();
const NbrEmprunts=Emprunts.length;
const LivreEmprunts=await Livre.find().sort({nombreEmprunt:1}).limit(10);
const utilisateurs=await Utilisateur.find({role:'client'});
const NbrUtilisateurs=utilisateurs.length;
const message1 = `Nombre d'emprunts: ${NbrEmprunts}.`;
const message2=`Nombres de lecteurs:${NbrUtilisateurs}.`;
const message3 = `Les 10 livres les plus empruntés:`;

return res.status(200).send({ message1,message2,message3,LivreEmprunts});
} catch(error){
return res.status(500).send(error);
}
}