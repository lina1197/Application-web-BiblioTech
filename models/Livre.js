import mongoose from 'mongoose';
const {schema,model}='mongoose';

const livreSchema=new Schema({

catégorie:{
    type:String,
    required:true,
},
note:{
    type:int,
    required:true,
},
auteur:{
    type:String,
    required:true,
},

},{timestamps:true}
)

const Livre=model('Livre',livreSchema);
export default Livre;