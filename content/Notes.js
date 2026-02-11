
const structure1=require("../Model/Notes");


const sendNotes=async(req,res)=>{
    try {
        console.log('📝 sendNotes function called');
        console.log('Request body:', req.body);
        console.log('Request file:', req.file);
        console.log('User from token:', req.user);
        
        const {head,description,user,favourite} = req.body;
        const document = req.file ? req.file.filename : null;
        
        if(!head){
            return res.status(400).json({message:"head is required"})
        }
        
        if(!user){
            return res.status(400).json({message:"user is required"})
        }
        
        const newNotes=await structure1.create({
            head,
            description,
            document,
            user,
            favourite: favourite || false
        })
        
        console.log('✅ Note created successfully:', newNotes._id);
        return res.status(201).json({
            message:"Notes created successfully",
            note: newNotes
        })
        
    } catch (error) {
        console.error("❌ Error creating note:", error);
        console.error("Error stack:", error.stack);
        return res.status(500).json({
            message: "Internal server error", 
            error: error.message,
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}




const getNotes=async(req,res)=>{
    const {id}=req.params;
 
    if(!id){
        return res.status(400).json({message:"usersignin required"})
    }

    const notes = await structure1.find({user:id})

    if(!notes){
        return res.status(404).json({message:"Notes not found"} )
    }
    return res.status(200).json(notes)




}

    const deleteNotes=async(req,res)=>{
        const {id}=req.params;
    
        const notes = await structure1.findByIdAndDelete(id)

        if(notes){
            
               return res.send("deleted successfully")

        }
        else{
            return res.status(404).json({message:"Notes not found"})
        }
     



    }

    const starNotes = async (req, res) => {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "id is required" });
        }
        const item = await structure1.findById(id);
        if (!item) {
            return res.status(404).json({ message: "Note not found" });
        }
        const updated = await structure1.findByIdAndUpdate(id, { favourite: !item.favourite }, { new: true });
        return res.json({ message: "done favourited", note: updated });
    }

    const favNotes= async(req,res)=>{
        const {id} = req.params;
        if (id) {
          
             const favonotes= await structure1.find({user:id,favourite:true})
        return res.status(200).json(favonotes);
        }   
        else{
              return res.status(400).json({ message: "id is required" });
       
    }


    }

module.exports={sendNotes,getNotes,deleteNotes,starNotes,favNotes}













