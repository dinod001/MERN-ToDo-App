import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: true,
    },
  },
  { Timestamps: true }
);

const ToDo = mongoose.model("ToDo", todoSchema);

export default ToDo;
