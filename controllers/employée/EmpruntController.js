import Livre from '../../models/Livre.js'
import Emprunt from '../../models/Emprunt.js'
import Utilisateur from '../../models/Utilisateur.js';

// Add a rental
export async function AddRental (req, res) {
try { 
const { livre, utilisateur,dateEmprunt,dureeEmprunt } = req.body;
console.log(dateEmprunt);
const date=new Date(dateEmprunt);
console.log(date);
const date2=new Date(dateEmprunt);
const tenDaysInMs = 10 * 24 * 60 * 60 * 1000; // Convert 10 days to milliseconds

const empruntSuspended = await Emprunt.find({
  isSuspended: true,
  utilisateur: utilisateur,
  dateRetour: {
    $gte: new Date(date2.getTime() - tenDaysInMs),
    $lte: date2
  }
});

console.log(empruntSuspended.length);
if(empruntSuspended.length!==0) {
return res.status(404).send({ message: 'it has been less than 10 days since you have been suspended so you cannot rent a book for now' });
}
    

const year = date.getFullYear();
const month = date.getMonth();
const startOfMonth = new Date(year, month, 1);
const endOfMonth = new Date(year, month + 1, 0);
console.log(startOfMonth); // logs the start of the month
console.log(endOfMonth); // logs the end of the month

// verify availability
const available = await Livre.findById( livre ).select('nombreCopiesDisponible');
const nbrEmprunts = await Livre.findById( livre ).select('nombreEmprunts');

console.log(available);
if (!available) {
return res.status(404).send({ message: 'Livre not found' });
}
const nombreCopiesDisponible = available.nombreCopiesDisponible;
const nombreEmprunts = nbrEmprunts.nombreEmprunts;

const foundLivre = await Livre.findById(livre);
console.log(foundLivre);
const foundUtilisateur = await Utilisateur.findById(utilisateur);
console.log(foundUtilisateur);
const emprunts = await Emprunt.find({ utilisateur,dateEmprunt: { $gte: startOfMonth, $lt: endOfMonth } }) 
console.log(emprunts);
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

    if (emprunts.length==3) {
    return res.status(400).send({ message: 'you have exceeded maximum number of rentals for this month' });
    }
 
   // if all previous conditions are not met, create a new rental
            const emprunt = await Emprunt.create({ livre, utilisateur, dateEmprunt,dureeEmprunt});
            console.log(emprunt);
 
                // Update Livre availability after a rental
            const updatedNombreCopiesDisponible =nombreCopiesDisponible- 1;
            console.log(updatedNombreCopiesDisponible)
            // update number of rentals after new rental has been created
            const updatedNombreEmprunts =nombreEmprunts+ 1;
           const book = await Livre.findByIdAndUpdate(livre, 
  { $set: { 
    nombreCopiesDisponible: updatedNombreCopiesDisponible,
    nombreEmprunts: updatedNombreEmprunts 
  } }, 
  { new: true }
);
console.log(book);
            return res.send(emprunt); 
  }catch (error) {
                  return res.status(500).send(error);
    }}



export async function UpdateRental (req,res) {
    try {
    const empruntId=req.params.id;
    const dateRetourString = req.body.dateRetour;
    const dateRetour = new Date(dateRetourString);
    console.log(dateRetour);
    const update = { dateRetour: dateRetour };
    const foundEmprunt=await Emprunt.findById(empruntId);
    if (!foundEmprunt) {
    return res.status(404).json({ message: 'Rental not found' });
  }
    const { dateEmprunt, dureeEmprunt } = await Emprunt.findById(empruntId).select('dateEmprunt dureeEmprunt').exec();
    const dateRetourPrevue=new Date(dateEmprunt.getTime() +(dureeEmprunt * 24 * 60 * 60 * 1000) );
    console.log(dateRetourPrevue);
  if (foundEmprunt.dateRetour) {
      return res.status(400).json({ message: 'Book already returned' });
    } else if (dateRetour > dateRetourPrevue) {
      await Emprunt.findByIdAndUpdate(empruntId, { isSuspended: true });
      const updatedEmprunt = await Emprunt.findByIdAndUpdate(empruntId, update, { new: true });
      return res.send(updatedEmprunt);
    } else {
      const emprunt = await Emprunt.findByIdAndUpdate(empruntId, update, { new: true });
      return res.send(emprunt);
    }
}catch(error) {
            return res.status(500).send(error);
        }  
    }


  //renew rental function
  export async function renewRental(req,res){
  try {
  const empruntId=req.params.id;
  console.log(empruntId)
  const newDureeEmprunt=req.body.newDureeEmprunt;
  console.log(newDureeEmprunt)
  const date=await Emprunt.findById(empruntId).select('dateEmprunt');
  const dateEmprunt=date.dateEmprunt;
  console.log(dateEmprunt)
  const duree=await Emprunt.findById(empruntId).select('dureeEmprunt');
  const dureeEmprunt=duree.dureeEmprunt;
  const dateRetourPrevue=new Date(dateEmprunt.getTime() +(dureeEmprunt * 24 * 60 * 60 * 1000) );
  console.log(dateRetourPrevue)
  const dateRetourString = req.body.dateRetour;
  console.log(dateRetourString)
  const dateRetour = new Date(dateRetourString);
  console.log(dateRetour)
  if(dateRetour<=dateRetourPrevue){
  const foundEmprunt = await Emprunt.findByIdAndUpdate(empruntId, { $set: { ...{dateEmprunt:dateRetour}, ...{dureeEmprunt:newDureeEmprunt} } }, { new: true });
      return res.send(foundEmprunt);

} 
  else {
    const foundEmprunt = await Emprunt.findByIdAndUpdate(empruntId, { isSuspended:true }, { new: true });
    res.json({message:'You have returned the book late, you cannot rent a book for 10days'});
      return res.send(foundEmprunt);

  }
  } catch(error) {
            return res.status(500).send(error);

  }
  }