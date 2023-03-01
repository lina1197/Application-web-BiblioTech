import Livre from '../../models/Livre.js'
import Emprunt from '../../models/Emprunt.js'
import Utilisateur from '../../models/Utilisateur.js';

// Add a rental
export async function AddRental (req, res) {
try {
const { livre, utilisateur,dateEmprunt } = req.body;

// verify availability

// const LivreId = req.params.id;
// const doc = await Livre.findOne({ _id: LivreId }).select('nombreCopiesDisponible').exec();
const doc = await Livre.findOne({ livre }).select('nombreCopiesDisponible').exec();

if (!doc) {
return res.status(404).send({ message: 'Livre not found' });
}
const nombreCopiesDisponible = doc.nombreCopiesDisponible;


// const { livre, utilisateur,dateEmprunt } = req.body;
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
    
            const foundEmprunt = await Emprunt.findOne({ livre, utilisateur, dateEmprunt});
            if (foundEmprunt) {
                return res.send({ message: 'EXISTS' });
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
            const emprunt = await Emprunt.create({ livre, utilisateur, dateEmprunt});

                // Update Livre availability after a rental
            const updatedNombreCopiesDisponible =nombreCopiesDisponible- 1;
            // const book=await Livre.findOneAndUpdate({ _id: LivreId }, { nombreCopiesDisponible:updatedNombreCopiesDisponible },{new:true});
            // return res.send(book);
            const book=await Livre.findOneAndUpdate({ livre }, { nombreCopiesDisponible:updatedNombreCopiesDisponible },{new:true});
            return res.send(book);
            
             
            } catch (error) {
            
            return res.status(500).send(error);
        }
    }
