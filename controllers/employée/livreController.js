   import Livre from '../../models/Livre.js'
   import Catégorie from '../../models/Catégorie.js';

   // Add a book
    export async function AddBook (req, res) {

        try {
    const { name, catégorie, note, auteur,nombreEmprunts,nombreCopiesDisponible } = req.body;
const foundCategory = await Catégorie.findById(catégorie);
    if (!foundCategory) {
      return res.status(400).send({ message: 'Invalid category ID' });
    }
            const foundBook = await Livre.findOne({ name, catégorie, note, auteur, nombreEmprunts,nombreCopiesDisponible});
            if (!foundBook) {

                const livre = await Livre.create({ name, catégorie, note, auteur, nombreEmprunts,nombreCopiesDisponible });
                return res.send(livre);
            } else {

                return res.send({ message: 'EXISTS' });
            }
        } catch (error) {
            
            return res.status(500).send(error);
        }
    }

