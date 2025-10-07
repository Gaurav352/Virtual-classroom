import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true 
  },
  originalFilename: { 
    type: String, 
    required: true 
  },
  faissStorePath: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

const Document = mongoose.model("Document", documentSchema);
export default Document;