   import Catégorie from '../../models/Catégorie.js'
    // Create a category
    export async function createCategory (req, res) {

        try {

            const foundCategory = await Catégorie.findOne({ name: req.body.name });
            if (!foundCategory) {

                const catégorie = await Catégorie.create(req.body);
                return res.send(catégorie);
            } else {

                return res.send({ message: 'EXISTS' });
            }
        } catch (error) {
            
            return res.status(500).send(error);
        }
    }
