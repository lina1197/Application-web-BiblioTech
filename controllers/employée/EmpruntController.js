import Livre from '../../models/Livre.js'
import Emprunt from '../../models/Emprunt.js'
import Utilisateur from '../../models/Utilisateur.js';

// Add a rental
export async function AddRental (req, res) {
try { 
const { livre, utilisateur,dateEmprunt,dureeEmprunt } = req.body;
// verify availability
const doc = await Livre.findOne({ livre }).select('nombreCopiesDisponible').exec();

if (!doc) {
return res.status(404).send({ message: 'Livre not found' });
}
const nombreCopiesDisponible = doc.nombreCopiesDisponible;
const foundLivre = await Livre.findById(livre);
const foundUtilisateur = await Utilisateur.findById(utilisateur);
    if (!foundLivre) {
      return res.status(400).send({ message: 'Invalid livre ID' });
    }
    if (!foundUtilisateur) {
      return res.status(400).send({ message: 'Invalid utilisateur ID' });
    }
    if (nombreCopiesDisponible==0) {
      return res.status(400).send({ message: 'this book is not available' });
    }
    
    //limit number of book rentals to 3 a month by user
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const emprunts = await Emprunt.find({ utilisateur,dateEmprunt: { $gte: startOfMonth, $lt: endOfMonth } }) 
    if (emprunts.length >= 3) {
    return res.status(400).send({ message: 'You have reached the maximum number of rentals for this month.' });
}
// create a new rental if book is available and user has not exceeded his quota of rentals
            const emprunt = await Emprunt.create({ livre, utilisateur, dateEmprunt,dureeEmprunt});

                // Update Livre availability after a rental
            const updatedNombreCopiesDisponible =nombreCopiesDisponible- 1;
            
            const book=await Livre.findOneAndUpdate({ livre }, { nombreCopiesDisponible:updatedNombreCopiesDisponible },{new:true});
            return res.send(emprunt);
            
             
            } catch (error) {
            
            return res.status(500).send(error);
        }
    }



export async function UpdateRental (req,res) {
    try {
    const empruntId=req.params.id;
    const dateRetourString = req.body.dateRetour;
    const dateRetour = new Date(dateRetourString);
    console.log(dateRetour);
    const update = { dateRetour: dateRetour };
    const foundEmprunt=await Emprunt.findOne({_id:empruntId});
    if (!foundEmprunt) {
    return res.status(404).json({ message: 'Rental not found' });
  }

  if (foundEmprunt.dateRetour) {
    return res.status(400).json({ message: 'Book already returned' });
  }
    const emprunt=await Emprunt.updateOne({ _id:empruntId}, update ,{new:true});
    const empruntDt = await Emprunt.findById(empruntId).select('dateEmprunt').exec();
    const dateEmprunt = empruntDt.dateEmprunt;
    const empruntDuree = await Emprunt.findById(empruntId).select('dureeEmprunt').exec();
    const dureeEmprunt = empruntDuree.dureeEmprunt;
    const dateRetourPrevue=new Date(dateEmprunt.getTime() +(dureeEmprunt * 24 * 60 * 60 * 1000) );
    console.log(dateRetourPrevue);
if (!emprunt) {
    return res.status(404).json({ message: 'Rental not found' });
  }

  if (emprunt.dateRetour) {
    return res.status(400).json({ message: 'Book already returned' });
  }
  if (dateRetour > dateRetourPrevue) {
  const daysLate = Math.ceil((dateRetour - dateRetourPrevue) / (1000 * 60 * 60 * 24));
  const penaltyFee = daysLate * 1.5; // example fee of $1.50 per day
  const updatePenalite = { penalite: penaltyFee };

  // const emprunt=await Emprunt.updateOne({ _id:empruntId}, update,updatePenalite, {new:true});
const emprunt = await Emprunt.findByIdAndUpdate(empruntId, { $set: { ...updatePenalite, ...update } }, { new: true });
return res.send(emprunt);

}
    } catch(error) {
            return res.status(500).send(error);
        }  
    }
