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
isSuspended:{
   type:Boolean,
   default:false,
},
dureeEmprunt:{
   type:Number,
},
dateRetourPrevue:{
   type:Date,
}
}
)

const Emprunt=model('Emprunt',EmpruntSchema);
export default Emprunt;