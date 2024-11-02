const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    kedalaman: {
      type: Number,
      required: true,
    },
    HB: {
      type: Number,
      required: true,
    },
    HL: {
      type: Number,
      required: true,
    },
    FR: {
      type: Number,
      required: true,
    },
    bagemann: {
      type: Number,
      required: true,
    },
    shertmann: {
      type: Number,
      required: true,
    },
    titik: {
      type: Number,
      required: true,
    },
  },
  { _id: true }
);

const projectSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    desc: {
      required: true,
      type: String,
    },
    data: {
      type: [dataSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = {
  Project,
};
