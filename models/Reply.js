import mongoose from 'mongoose';
const {Schema,model}=mongoose;

const replySchema = new Schema({
  content: { type: String, required: true },
  author : { type: Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
  comment : { type: Schema.Types.ObjectId, ref: 'Comment', required: true },
}, { timestamps: true });

const Reply=model('Reply',replySchema);
export default Reply;