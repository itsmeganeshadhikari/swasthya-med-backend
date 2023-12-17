import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    username: {
        type: string,
        required: true,
    },
    accessLevel: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

const Role = mongoose.model('Role', roleSchema);
export default Role;