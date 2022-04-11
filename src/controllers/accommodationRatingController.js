import { AccommodationRatingService } from '../services/accommodationRatingServices';
import { PageNotFoundError } from '../httpErrors/pageNotFoundError';

export class AccommodationRatingController {
  static async create(id, req, res, next) {
    console.log('=========================');
    console.log(id);
    try {
      const rating = await AccommodationRatingService.findOne(
        parseInt(id),
        parseInt(req.params.id),
      );
      if (rating) {
        rating.rating = parseInt(req.body.rating);
        rating.feedback = req.body.feedback;
        const accommodationRating = await AccommodationRatingService.update(
          rating,
        );
        return res.status(201).json({
          status: '201',
          message: 'rating updated successfully',
          payload: accommodationRating,
        });
      }
      const accommodationRating = await AccommodationRatingService.create({
        userId: id,
        accommodationId: req.params.id,
        rating: req.body.rating,
        feedback: req.body.feedback,
      });
      return res.status(201).json({
        status: '201',
        message: 'rating added successfully',
        payload: accommodationRating,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findAccommodationRating(req, res, next) {
    try {
      const ratings = await AccommodationRatingService.findAllByAccommodation(
        parseInt(req.params.id),
      );
      if (ratings) {
        const list = [...ratings.rows];
        let averageRating = 0;
        list.forEach((element) => {
          averageRating += element.rating;
        });
        averageRating /= ratings.count;
        return res.status(200).json({
          status: '200',
          message: 'Ratings',
          payload: { averageRating, ratings },
        });
      }
      throw new PageNotFoundError('Ratings not found');
    } catch (error) {
      next(error);
    }
  }
}