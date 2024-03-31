import conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) =>{
    try {
        const {message} = req.body;
        const {id: receiverid} = req.params;
        const senderid = req.user._id;

        let converse = await conversation.findOne({
            participants: {$all: [senderid, receiverid]},
        });

        if(!converse){
            converse = await conversation.create({
                participants: [senderid, receiverid],
                message: [],
            });
        }

        const newMessage = new Message({
            senderid,
            receiverid,
            message,
        });
        
        if(newMessage){
            converse.message.push(newMessage._id);
        }

        // Socket IO will be here

        await Promise.all([converse.save(), newMessage.save()]);

        res.status(200).json(newMessage);

        
    } catch (error) {
        
        console.log("Error in message controller", error.message);
        res.status(500).json({error: "Internal server error."})
    }
}

export const getMessages = async (req,res) => {
    try {
        const {id: userToChatId} = req.params;
        const senderid = req.user._id;

        const converse = await conversation.findOne({
            participants: { $all: [senderid, userToChatId] },
        }).populate("message");

        if(!converse) res.status(404).json([]);
        res.status(200).json(converse.message)
        
    } catch (error) {

        console.log("Error in message controller", error.message);
        res.status(500).json({error: "Internal server error."})
    }
}