import mongoose from 'mongoose';
const {schema,model}='mongoose';

const EmpruntSchema=new Schema({
dateEmprunt:{
    type:Date,
    default:Date.now
}
}
)

const Emprunt=model('Emprunt',empruntSchema);
export default Emprunt;