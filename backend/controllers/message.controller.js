export const sendMessage = async (req, res) =>{
    try {
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const {senderid} = req.user._id;

        
    } catch (error) {
        
    }
}