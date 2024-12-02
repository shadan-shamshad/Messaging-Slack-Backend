
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    body: {
        type: String,
        required: [true, "Message body is required"]
        },
    image:{
        type: String
        },
    ChannelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel',
        required: [true, "Channel id is required"]        
        },
    SenderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Sender id is required"]   
        },
    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'workspace',
        required: [true, "Workspace id is required"]
    }
});

 const Message = mongoose.model('Message', messageSchema);

export default Message;