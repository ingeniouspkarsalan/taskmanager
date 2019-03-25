const mongoose =require('mongoose');
const Scheme = mongoose.Schema;

const TaskScheme = new Scheme({
    description: {
        type: String,
        trim: true,
        required: true
      },
      completed: {
        type: Boolean,
        default: false
      },
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'USERS'
      }
    },
    {
      timestamps: true
    }
);

TaskScheme.methods.toJSON = function() {
    const task = this;
    const publicTask = task.toObject();
  
    delete publicTask.__v;
  
    return publicTask;
  };

var task = mongoose.model('Task',TaskScheme);

module.exports = task;