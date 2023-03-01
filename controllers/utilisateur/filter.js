import Livre from '../../models/Livre.js'

export async function Filter (req, res) {
const filters = req.query;
const livres = await Livre.find();

  const filteredLivres = livres.filter(livre => {
    let isValid = true;
    for (const key in filters) {
      console.log(key, livre[key], filters[key]);
      isValid = isValid && livre[key] == filters[key];
    }
    return isValid;
  });
  res.send(filteredLivres);
} 
