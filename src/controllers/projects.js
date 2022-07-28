import models from '../models';

const getAllProjects = async (req, res) => {
  try {
    if (req.query.id) {
      const project = await models.Projects.find({ _id: req.query.id, isDeleted: false }).populate(
        'members.employeeId',
        {
          _id: 1,
          firstName: 1,
          lastName: 1,
          active: 1,
        },
      );
      return res.status(200).json({
        message: 'Project found',
        data: project,
        error: false,
      });
    }
    const projects = await models.Projects.find({ isDeleted: false }).populate(
      'members.employeeId',
      {
        _id: 1,
        firstName: 1,
        lastName: 1,
        active: 1,
      },
    );
    if (projects.length < 1) {
      return res.status(404).json({
        message: 'There are no projects yet',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Projects found',
      data: projects,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

const getDeletedProjects = async (req, res) => {
  try {
    const projects = await models.Projects.find({ isDeleted: true }).populate(
      'members.employeeId',
      {
        _id: 1,
        firstName: 1,
        lastName: 1,
        active: 1,
      },
    );
    if (projects.length < 1) {
      return res.status(404).json({
        message: 'There are no projects deleted yet',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Projects found',
      data: projects,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

const createNewProject = async (req, res) => {
  try {
    const project = new models.Projects({
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      clientName: req.body.clientName,
      active: req.body.active,
      isDeleted: false,
      members: req.body.members,
    });
    await project.save();
    return res.status(201).json({
      message: 'Project created',
      data: project,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const result = await models.Projects.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!result) {
        return res.status(404).json({
          message: 'Project not found',
          data: {},
          error: true,
        });
      }
      return res.status(200).json({
        message: 'The project has been updated successfully',
        data: result,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'Invalid format ID',
      data: req.params.id,
      error: true,
    });
  } catch (error) {
    return res.json({
      message: 'Error',
      data: error.message,
      error: true,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      const result = await models.Projects.findByIdAndUpdate(
        req.params.id,
        { isDeleted: true },
        { new: true },
      );
      if (!result) {
        return res.status(404).json({
          message: `Id ${req.params.id} does not exist`,
          data: {},
          error: true,
        });
      }
      return res
        .json({
          message: 'The project was successfully deleted',
          data: result,
          error: false,
        })
        .status(200);
    }
    return res.status(400).json({
      message: `id:${req.params.id} is not valid`,
      data: {},
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error ocurred',
      data: error.message,
      error: true,
    });
  }
};

const removeProject = async (req, res) => {
  try {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      const result = await models.Projects.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(404).json({
          message: `Id ${req.params.id} does not exist`,
          data: {},
          error: true,
        });
      }
      return res
        .json({
          message: 'The project was successfully removed',
          data: result,
          error: false,
        })
        .status(200);
    }
    return res.status(400).json({
      message: `id:${req.params.id} is not valid`,
      data: {},
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error ocurred',
      data: error.message,
      error: true,
    });
  }
};

export default {
  getAllProjects,
  getDeletedProjects,
  createNewProject,
  updateProject,
  deleteProject,
  removeProject,
};
