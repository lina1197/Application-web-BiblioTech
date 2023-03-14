import mongoose from 'mongoose';
const {Schema,model}=mongoose;

const commentSchema = new Schema({
  content: { type: String, required: true },
  author : { type: Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
  livre : { type: Schema.Types.ObjectId, ref: 'Livre', required: true },
}, { timestamps: true });

const Comment=model('Comment',commentSchema);
export default Comment;