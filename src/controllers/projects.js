import models from '../models';
// UPDATE project By Mati
const updateProject = async (req, res) => {
  try {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      const result = await models.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      if (!result) {
        return res.status(404).json({
          message: 'Project not found',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'The project has updated successfully',
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
      const result = await models.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(404).json({
          message: `Id ${req.params.id} does not exist`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'The project deleted successfully',
        data: result,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'ID format is not valid',
      data: req.params.id,
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
  updateProject,
  deleteProject,
};
