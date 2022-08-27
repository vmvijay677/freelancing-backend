import projectModel from "../Models/Projects.js";

//project creation by client
export const createProject = async (req, res) => {
    const newProject = new projectModel(req.body);

    try {
        await newProject.save();
        res.status(200).json(newProject);
    } catch (error) {
        res.status(500).json(error);
    }
};

//getting projects
export const getProject = async (req, res) => {
    try {
        const project = await projectModel.find({});

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json(error);
    }
};

//apply for projects
export const applyProject = async (req, res) => {
    const id = req.params.id;

    const { freelancerId } = req.body;

    try {
        const project = await projectModel.findById(id);

        if (!project.applications.includes(freelancerId)) {
            await project.updateOne({ $push: { applications: freelancerId } });
            res.status(200).json("Project applied!");
        } else {
            await project.updateOne({ $pull: { applications: freelancerId } });
            res.status(200).json("Project not applied!");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};