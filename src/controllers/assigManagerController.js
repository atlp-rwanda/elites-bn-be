import { assignManager } from '../services/asignManager';

class ManagerContoller {
  assignManager = async (req, res, next) => {
    try {
      const updatedUser = await assignManager(req.params.id, req.body.manager);
      if (updatedUser) {
        return res
          .status(200)
          .json({
            status: 200,
            message: 'user assigned manager successfully',
            payload: updatedUser,
          });
      } else {
        throw new Error('unable to assign a manager');
      }
    } catch (err) {
      next(err);
    }
  };
}

export default ManagerContoller;
