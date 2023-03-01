import Livre from '../../models/Livre.js'
import Emprunt from '../../models/Emprunt.js'
import Utilisateur from '../../models/Utilisateur.js';

// Add a rental
export async function AddRental (req, res) {
try {
// verify availability
const LivreId = req.params.id;
const doc = await Livre.findOne({ _id: LivreId }).select('nombreCopiesDisponible').exec();
if (!doc) {
      return res.status(404).send({ message: 'Livre not found' });
    }
    const nombreCopiesDisponible = doc.nombreCopiesDisponible;

    // if (nombreCopiesDisponible === 0) {
    //   return res.status(400).send({ message: 'This book is not available' });
    // }
    
const { livre, utilisateur,dateEmprunt } = req.body;
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
            const emprunt = await Emprunt.create({ livre, utilisateur, dateEmprunt});

                // Update Livre availability
            const updatedNombreCopiesDisponible =nombreCopiesDisponible- 1;
            const book=await Livre.findOneAndUpdate({ _id: LivreId }, { nombreCopiesDisponible:updatedNombreCopiesDisponible },{new:true});
            return res.send(book);
            
             
            } catch (error) {
            
            return res.status(500).send(error);
        }
    }
