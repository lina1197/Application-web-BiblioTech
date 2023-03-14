import mongoose from 'mongoose';
const {Schema,model}=mongoose;

const livreSchema=new Schema({
name:{
    type:String,
    required:true,
},
catégorie:{
   type: Schema.Types.ObjectId,
   ref: 'Catégorie'
},
note:{
    type:Number,
    required:true,
},
auteur:{
    type:String,
    required:true,
},
nombreEmprunts:{
    type:Number,
    required:true,
},
nombreCopiesDisponible:{
    type:Number,
    required:true,
},
comments: [{
             type: mongoose.Schema.Types.ObjectId,
             ref: 'Comment'
           }],
},{timestamps:true}
)

const Livre=model('Livre',livreSchema);
export default Livre;