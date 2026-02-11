
const structure1=require("../Model/Notes");


const sendNotes=async(req,res)=>{
    try {
        const {head,description,user,favourite} = req.body;
        const document = req.file ? req.file.filename : null;
        
        if(head){
            const newNotes=await structure1.create({head,description,document,user,favourite})
            return res.status(201).json({message:"Notes created successfully"})
        }
        else{
            return res.status(400).json({message:"head is required"})
        }
    } catch (error) {
        console.error("Error creating note:", error);
        return res.status(500).json({message: "Internal server error", error: error.message});
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













