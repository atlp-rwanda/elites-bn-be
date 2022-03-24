/* eslint-disable class-methods-use-this */
import { fileUpload } from '../helpers/fileUpload';
import { compareBirthDate } from '../helpers/dateComparison';
import {
  createProfile,
  getAllProfiles,
  getSingleProfile,
  updateProfile,
  fetchData,
  deleteprofile,
} from '../services/profileServices';
import { ConflictsError } from '../httpErrors/conflictError';
import { ForbbidenError } from '../httpErrors/forbidenError';
import { PageNotFoundError } from '../httpErrors/pageNotFoundError';
class ProfileController {
  async createController(id, req, res, next) {
    try {
      if (req.file) {
        req.body.picture = await fileUpload(req);
      } else {
        req.body.picture = 'https://www.pngkit.com/png/detail/126-1262807_instagram-default-profile-picture-png.png';
      }

      const fetchedData = await fetchData(id);
      req.body.name = fetchedData.names;
      req.body.email = fetchedData.email;
      req.body.role = fetchedData.roleId;
      req.body.manager = fetchedData.managerId;
      const datesValidation = compareBirthDate(req.body.birthdate);
      if (!datesValidation) {
        throw new Error('Validation error, incorrect birthdate field');
      }

      const data = {
        ...req.body,
        userId: id,
      };
      const created = await createProfile(id, data);

      if (created) {
        res
          .status(201)
          .json({ status: 201, message: 'Profile created', payload: created });
      } else {
        throw new ConflictsError('User has profile saved');
      }
    } catch (err) {
      next(err);
    }
  }

  async getProfileController(id, req, res, next) {
    try {
      const getProfile = await getAllProfiles(id);
      if (getProfile) {
        res.status(200).json({
          status: 200,
          message: 'profile retrieved successfully',
          payload: getProfile,
        });
      }
      throw new ForbbidenError('not authorized to access profiles');
    } catch (err) {
      next(err);
    }
  }

  async getSingleProfile(id, req, res, next) {
    try {
      const getProfile = await getSingleProfile(req.params.id, id);
      if (getProfile) {
        res.status(200).json({
          status: 200,
          message: 'The profile retrieved successfully!!',
          payload: getProfile,
        });
      }
      throw new PageNotFoundError('Resource not found');
    } catch (err) {
      next(err);
    }
  }

  async updateUserProfile(id, req, res, next) {
    try {
      if (req.file) {
        req.body.picture = await fileUpload(req);
      } else {
        req.body.picture = 'https://www.pngkit.com/png/detail/126-1262807_instagram-default-profile-picture-png.png';
      }

      const data = {
        ...req.body,
      };

      const updated = await updateProfile(id, data);
      if (updated) {
        res.status(200).json({
          status: 200,
          message: 'profile updated successfully',
          payload: updated,
        });
      } else {
        throw new PageNotFoundError('Resource to update not found');
      }
    } catch (err) {
      next(err);
    }
  }

  async deleteProfile(id, req, res, next) {
    try {
      const delTripRequests = await deleteprofile(id);
      if (delTripRequests) {
        res.send({ status: 204, message: 'deleted successfully' });
      } else {
        res.status(200).json({
          status: 200,
          message: 'deleted',
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

export default ProfileController;
