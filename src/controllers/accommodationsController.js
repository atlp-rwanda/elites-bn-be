/* eslint-disable class-methods-use-this */
import cloudinary from '../config/cloudinary';
import accommodationServices from '../services/accommodationServices';
import { decodeAcessToken } from '../helpers/jwtFunction';
import { BaseError } from '../httpErrors/baseError';

const AccommodationServices = new accommodationServices();

class AccommodationController {
  async createAccommodation(req, res, next) {
    try {
      // getting user ID from access Token
      const token = req.headers.authorization.split(' ')[1];
      const decoded = await decodeAcessToken(token);
      req.body.userId = decoded.id;

      const geoCoordinates = [];
      const amenities = [];
      if (!Array.isArray(req.body.geoCoordinates)) {
        geoCoordinates.push(req.body.geoCoordinates);
        req.body.geoCoordinates = geoCoordinates;
      }
      if (!Array.isArray(req.body.amenities)) {
        amenities.push(req.body.amenities);
        req.body.amenities = amenities;
      }
      const pictures = req.files;
      const urls = [];
      if (pictures) {
        const uploadImages = pictures.map((image) => cloudinary.uploader.upload(image.path, { folder: 'barefoot_api' }));
        const imageResponse = await Promise.all(uploadImages);
        for (const file of imageResponse) {
          urls.push(file.url);
        }
      }
      const data = {
        ...req.body,
        images: urls,
      };

      const createdAccommodation = await AccommodationServices.createAccommodation(data);
      return res.status(201).json({
        status: '201',
        message: 'Accommodation added successfully',
        payload: createdAccommodation,
      });
    } catch (err) {
      next(err);
    }
  }

  async getOneAccommodation(req, res, next) {
    try {
      const accommodation = await AccommodationServices.getOneAccommodation(
        req.params.accommodationId,
      );
      if (accommodation) {
        res.status(200).json({
          status: 200,
          message: 'accommodation found',
          payload: accommodation,
        });
      } else {
        throw new BaseError(
          'Not found',
          404,
          'Accommodation with that ID does not exists',
        );
      }
    } catch (err) {
      next(err);
    }
  }

  async getAccommodationsByLocation(req, res, next) {
    try {
      const accommodations = await AccommodationServices.getAccommodationsByLocation(
        req.params.locationId,
      );
      res.status(200).json({
        status: 200,
        message: 'These are the accommodations in specified location',
        payload: accommodations,
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllAccommodations(req, res, next) {
    try {
      const accommodations = await AccommodationServices.getAllAccommodations();
      res.status(200).json({
        status: 200,
        message: 'These are all the accommodations',
        payload: accommodations,
      });
    } catch (err) {
      next(err);
    }
  }

  async updateAccommodation(req, res, next) {
    try {
      const geoCoordinates = [];
      const amenities = [];
      if (geoCoordinates) {
        if (!Array.isArray(req.body.geoCoordinates)) {
          geoCoordinates.push(req.body.geoCoordinates);
          req.body.geoCoordinates = geoCoordinates;
        }
      }
      if (amenities) {
        if (!Array.isArray(req.body.amenities)) {
          amenities.push(req.body.amenities);
          req.body.amenities = amenities;
        }
      }

      const pictures = req.files;
      const imagesURLs = [];
      if (pictures || pictures !== undefined) {
        const uploadImages = pictures.map((image) => cloudinary.uploader.upload(image.path, { folder: 'barefoot_api' }));
        const imageResponse = await Promise.all(uploadImages);
        for (const file of imageResponse) {
          imagesURLs.push(file.url);
        }
      }
      const accommodationToUpdate = await AccommodationServices.getOneAccommodation(
        req.params.accommodationId,
      );

      if (geoCoordinates == undefined) {
        req.body.geoCoordinates = accommodationToUpdate.geoCoordinates;
      }
      if (amenities == undefined) {
        req.body.amenities = accommodationToUpdate.amenities;
      }

      const accommodationUpdates = {
        ...req.body,
        images:
          imagesURLs.length > 0 ? imagesURLs : accommodationToUpdate.images,
      };
      const updatedAccommodation = await AccommodationServices.updateAccommodation(
        req.params.accommodationId,
        accommodationUpdates,
      );
      res.status(200).json({
        status: 200,
        message: 'accommodation updated successfully',
        payload: updatedAccommodation,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteAccommodation(req, res, next) {
    try {
      const deleteMessage = await AccommodationServices.deleteAccommodation(
        req.params.accommodationId,
      );
      res.status(200).json({ status: 200, message: deleteMessage });
    } catch (err) {
      next(err);
    }
  }
}
export default AccommodationController;
