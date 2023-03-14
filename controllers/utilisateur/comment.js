import Comment from "../../models/Comment.js";
import Reply from "../../models/Reply.js";

export async function addComment(req,res) {
    try {
    const {content, author, livre}=req.body;
    const comment = await Comment.create({ content, author, livre});
    return res.status(200).json({ message: 'comment added' });

    } catch(error) {
    return res.status(500).send(error);
    }
}

export async function addReply(req,res) {
    console.log('addReply called');

    try {
    console.log('req.body:', req.body);
    const {content, author, comment}=req.body;

    const reply = await Reply.create({ content, author, comment});
    return res.status(200).json({ message: 'reply added' });
    } catch(error) {
    return res.status(500).send(error);
    }
}

export async function deleteReply(req,res) {
    try {
    const reply=await Reply.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: 'reply deleted successfully' });

    } catch(error) {
    return res.status(500).send(error);
    }}

export async function deleteCommentAndItsReplies(req,res) {
    try {
    const comment=await Comment.findByIdAndDelete(req.params.id);
    const replies=await Reply.deleteMany({comment:req.params.id});
    return res.status(200).json({ message: 'comment and its replies deleted' });

    } catch(error) {
    return res.status(500).send(error);
    }}