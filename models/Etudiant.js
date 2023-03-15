import mongoose from 'mongoose';
const {Schema,model}=mongoose;

const EtudiantSchema=new Schema({
  notes:[Number], 
  coefficients:[Number],
  average:Number,

  }
)


const Etudiant=model('Etudiant',EtudiantSchema);
export default Etudiant;