import mongoose from 'mongoose';
const {Schema,model}=mongoose;

const EmpruntSchema=new Schema({
utilisateur:{
   type: Schema.Types.ObjectId,
   ref: 'Utilisateur'
},
livre:{
   type: Schema.Types.ObjectId,
   ref: 'Livre'
},
dateEmprunt:{
    type:Date,
},
dateRetour:{
   type:Date,
   default:null,
},
dureeEmprunt:{
   type:Number,
},
dateRetourPrevue:{
   type:Date,
},
penalite:{
   type:Number,
   default:0
}
}
)

const Emprunt=model('Emprunt',EmpruntSchema);
export default Emprunt;