import models from '../models';

// get all projects (Javi) ; populate by Pinche (:
const getAllProjects = async (req, res) => {
  try {
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

// get project by id (Javi)
const getProjectById = async (req, res) => {
  try {
    if (req.params.id) {
      const project = await models.Projects.findById(req.params.id).populate(
        'members.employeeId',
        {
          _id: 1,
          firstName: 1,
          lastName: 1,
          active: 1,
        },
      );
      if (project) {
        res.status(200).json({
          message: `Project with id ${req.params.id} found`,
          data: project,
          error: false,
        });
      } else {
        res.status(404).json({
          message: `Project with id ${req.params.id} not found`,
          data: {},
          error: true,
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

// get project by name (Javi)(and Pinche)
const getProjectByName = async (req, res) => {
  try {
    const project = await models.Projects.find({
      name: req.params.name,
    }).populate('members.employeeId', {
      _id: 1,
      firstName: 1,
      lastName: 1,
      active: 1,
    });
    if (project.length === 0) {
      return res.status(404).json({
        message: `Project with name ${req.params.name} not found`,
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: `Project with name ${req.params.name} found`,
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

// by Pinche B)
const getByPeriod = async (req, res) => {
  try {
    const init = req.body.initDate ?? false;
    const end = req.body.endDate ?? false;

    // if there is end and init date
    if (init && end) {
      const projects = await models.Projects.find({
        initDate: { $gte: init, $lte: end },
        endDate: { $gte: init, $lte: end },
      }).populate('members.employeeId', {
        _id: 1,
        firstName: 1,
        lastName: 1,
        active: 1,
      });
      return res.status(200).json({
        message: `Projects after ${init} and before ${end} found`,
        data: projects,
        error: false,
      });
    }

    // if there is init but no end date
    if (init) {
      const projects = await models.Projects.find({
        initDate: { $gte: init },
        endDate: { $gte: init },
      }).populate('members.employeeId', {
        _id: 1,
        firstName: 1,
        lastName: 1,
        active: 1,
      });
      return res.status(200).json({
        message: `Project after ${init} found`,
        data: projects,
        error: false,
      });
    }

    // if there is end but no init date
    if (end) {
      const projects = await models.Projects.find({
        initDate: { $lte: end },
        endDate: { $lte: end },
      }).populate('members.employeeId', {
        _id: 1,
        firstName: 1,
        lastName: 1,
        active: 1,
      });
      return res.status(200).json({
        message: `Projects before ${end} found`,
        data: projects,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'You must specify initDate and/or endDate!',
      data: {},
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

// get project by client name (Javi)
const getProjectByClientName = async (req, res) => {
  try {
    const project = await models.Projects.find({
      clientName: req.params.clientName,
    }).populate('members.employeeId', {
      _id: 1,
      firstName: 1,
      lastName: 1,
      active: 1,
    });
    if (project.length === 0) {
      return res.status(404).json({
        message: `Project with client ${req.params.clientName} not found`,
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: `Project with client ${req.params.clientName} found`,
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

// get project by status (Javi)
const getProjectByStatus = async (req, res) => {
  try {
    const project = await models.Projects.find({
      active: req.params.active,
    }).populate('members.employeeId', {
      _id: 1,
      firstName: 1,
      lastName: 1,
      active: 1,
    });
    if (project.length < 1) {
      return res.status(404).json({
        message: 'No projects found',
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Projects found!',
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

// create new project (Javi); adapted by Pinche (:
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
// Update project
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

// DELETE project By Mati
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

export default {
  getAllProjects,
  createNewProject,
  getProjectById,
  getProjectByName,
  getProjectByStatus,
  getByPeriod,
  getProjectByClientName,
  updateProject,
  deleteProject,
};
