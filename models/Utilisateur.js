import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const {Schema, model} =mongoose;

const utilisateurSchema= new Schema ({
name:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
    unique:true,
},
password:{
    type:String,
    required:true,
},
role : { type: String,
    enum: {
    values: ['client', 'employee'],
    message: '{VALUE} is not supported'
  }},
token:String
},
{timestamps:true}
)

utilisateurSchema.plugin(uniqueValidator);
const Utilisateur=model('Utilisateur', utilisateurSchema);
export default Utilisateur;