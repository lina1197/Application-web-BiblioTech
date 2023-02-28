import mongoose from 'mongoose';
const {Schema,model}=mongoose;

const CatégorieSchema=new Schema({

name:{
    type:String,
    required:true,
},

},{timestamps:true}
)

const Catégorie=model('Catégorie',CatégorieSchema);
export default Catégorie;