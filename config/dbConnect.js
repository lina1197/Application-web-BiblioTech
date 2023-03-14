import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://BiblioTechDbUser:qM79hDfx2DLtc1TK@ac-dn2igbi-shard-00-00.irr0dvt.mongodb.net:27017,ac-dn2igbi-shard-00-01.irr0dvt.mongodb.net:27017,ac-dn2igbi-shard-00-02.irr0dvt.mongodb.net:27017/?ssl=true&replicaSet=atlas-11xhb5-shard-0&authSource=admin&retryWrites=true&w=majority', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }).then(() => {
            console.log("connected");
        }).catch((err) => {
            console.error(err);
        });
    } catch (err) {
        console.error(err);
    }
}

export default connectDB;
