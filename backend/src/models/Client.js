import mongoose, {Schema} from "mongoose";

const Client = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  projects: [{type: Schema.Types.ObjectId, ref: 'Project', required: false}],
},
{
  timestamps: true
}).pre(/^find/, async function () {
  this.populate('projects');
}).pre(/^create/, async function (next) {

  if(this.isModified("projects") || this.isNew) {
    const projectData = this.projects;

    if(projectData && projectData.isModified){
      const savedProject = await projectData.save();
      this.projects = savedProject._id;
    }
  };
  next();
  
});

export default mongoose.model('Client', Client);