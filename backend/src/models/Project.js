import mongoose, { Schema } from "mongoose";

const Project = new Schema({
  name: { type: String, required: true, index: true },
  clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true, index: true },
  description: { type: String, required: true, index: true }
},
  {
    timestamps: true
  });

export default mongoose.model('Project', Project);