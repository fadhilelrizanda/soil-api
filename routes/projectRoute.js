const express = require("express");
const router = express.Router();
const { Project } = require("../model/model"); // Assuming "Project" is the model

// Test Route
router.get("/project", (req, res) => {
  console.log("GET /project");
  res.send("This route is working");
});

// Create a New Project
router.post("/create/project", async (req, res) => {
  const { title, desc } = req.body;
  const project = new Project({ title, desc });

  try {
    const savedProject = await project.save();
    console.log("Project created successfully:", savedProject);
    res.status(201).json(savedProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(400).json({ message: error.message });
  }
});

// Get All Projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: error.message });
  }
});

// Update Project Information
router.put("/update/project/:id", async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body, // Assuming the body contains fields like `title` and `desc`
      { new: true } // Returns the updated document
    );
    if (!updatedProject) throw new Error("Project not found");
    res.json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(400).json({ message: error.message });
  }
});

// Add Data Entry to an Existing Project
router.post("/add/data/:id", async (req, res) => {
  const { id } = req.params;
  const newData = req.body; // Expecting a data object as per `dataSchema`

  try {
    const project = await Project.findById(id);
    if (!project) throw new Error("Project not found");

    project.data.push(newData);
    await project.save();

    console.log("Data added successfully:", project);
    res.json(project);
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(400).json({ message: error.message });
  }
});

// Delete a Specific Data Entry in a Project
router.delete("/delete/data/:projectId/:dataId", async (req, res) => {
  const { projectId, dataId } = req.params;

  try {
    const project = await Project.findById(projectId);
    if (!project) throw new Error("Project not found");

    project.data = project.data.filter(
      (item) => item._id.toString() !== dataId
    );
    await project.save();

    console.log("Data entry deleted successfully:", project);
    res.json(project);
  } catch (error) {
    console.error("Error deleting data entry:", error);
    res.status(400).json({ message: error.message });
  }
});

// Delete an Entire Project
router.delete("/delete/project/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) throw new Error("Project not found");

    console.log("Project deleted successfully:", deletedProject);
    res.json(deletedProject);
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
