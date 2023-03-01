import Livre from "../../models/Livre.js";

export async function catalogue (req,res) {
try {
const livres = await Livre.find();
return res.send(livres);
} catch (error) {
    return res.status(500).send(error);
}

}