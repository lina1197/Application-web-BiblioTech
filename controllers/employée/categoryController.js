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

    //Delete a category
    export async function deleteCategory (req, res) {

        try {
        const categorie=await Catégorie.findByIdAndDelete(req.params.id);
        if(!categorie) return res.send({message:'category doesnt exist'});
        res.status(200).send({message:'deleted successfully'});

           
        } catch (error) {
            res.status(500).send(error);
        }
    }