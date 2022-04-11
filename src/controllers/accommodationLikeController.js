import { findAtrip } from '../services/tripServices';
import { AccommodationLikeService } from '../services/accommodationLikeServices';
import AccommodationServices from '../services/accommodationServices';
import { TripCommentService } from '../services/tripCommentServices';
import { PageNotFoundError } from '../httpErrors/pageNotFoundError';
import { ForbbidenError } from '../httpErrors/forbidenError';

export class AccommodationLikeController {
  static async dislike(id, req, res, next) {
    try {
      const accommodation = await new AccommodationServices().getOneAccommodation(
        parseInt(req.params.id),
      );
      if (accommodation) {
        const accommodationLike = await AccommodationLikeService.findOneByAccommodationAndUser(
          parseInt(id),
          parseInt(req.params.id),
        );
        if (accommodationLike) {
          if (accommodationLike.isLike) {
            accommodationLike.isLike = false;
            const newAccommodationLike = await AccommodationLikeService.update(
              accommodationLike,
            );
            return res.status(200).json({
              status: '200',
              message: 'Accommodation disliked successfully',
              payload: newAccommodationLike,
            });
          }
          return res.status(200).json({
            status: '200',
            message: 'Accommodation already disliked successfully',
            payload: accommodationLike,
          });
        }
        const newAccommodationLike = AccommodationLikeService.create({
          userId: id,
          accommodationId: parseInt(req.params.id),
          isLike: false,
        });
        return res.status(200).json({
          status: '200',
          message: 'Accommodation already disliked successfully',
          payload: newAccommodationLike,
        });
      }
      throw new PageNotFoundError('Accommodation not found');
    } catch (error) {
      next(error);
    }
  }

  static async like(id, req, res, next) {
    try {
      const accommodation = await new AccommodationServices().getOneAccommodation(
        parseInt(req.params.id),
      );
      if (accommodation) {
        const accommodationLike = await AccommodationLikeService.findOneByAccommodationAndUser(
          parseInt(id),
          parseInt(req.params.id),
        );
        if (accommodationLike) {
          if (accommodationLike.isLike == false) {
            accommodationLike.isLike = true;
            const newAccommodationLike = await AccommodationLikeService.update(
              accommodationLike,
            );
            return res.status(200).json({
              status: '200',
              message: 'Accommodation liked successfully',
              payload: newAccommodationLike,
            });
          }
          return res.status(200).json({
            status: '200',
            message: 'Accommodation already liked successfully',
            payload: accommodationLike,
          });
        }
        const newAccommodationLike = await AccommodationLikeService.create({
          userId: id,
          accommodationId: parseInt(req.params.id),
          isLike: true,
        });
        return res.status(200).json({
          status: '200',
          message: 'Accommodation like successfully',
          payload: newAccommodationLike,
        });
      }
      throw new PageNotFoundError('comment not found');
    } catch (error) {
      next(error);
    }
  }

  static async findAccommodationLikes(req, res, next) {
    try {
      const accommodation = await new AccommodationServices().getOneAccommodation(
        parseInt(req.params.id),
      );
      if (accommodation) {
        const dislikes = await AccommodationLikeService.findAllDisLikeByAccommodation(
          parseInt(req.params.id),
        );
        const likes = await AccommodationLikeService.findAllLikeByAccommodation(
          parseInt(req.params.id),
        );
        return res.status(200).json({
          status: '200',
          message: 'Accommodation likes and dislikes',
          payload: {
            likes: likes.count,
            dislikes: dislikes.count,
          },
        });
      }
      throw new PageNotFoundError('comment not found');
    } catch (error) {
      next(error);
    }
  }
}