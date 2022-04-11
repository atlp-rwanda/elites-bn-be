import { User, Role } from '../models';
import { NotFoundError } from '../httpErrors/NotFoundError';
import { AccommodationRatingService } from '../services/accommodationRatingServices';

export const hasVisitedAccommodation = async (id, req, res, next) => {
  try {
    const trips = await AccommodationRatingService.findAllTripsByUser(parseInt(id));
    let isAccommodationFound = false;
    if (trips.length > 0) {
      trips.forEach(async (trip) => {
        await trip.destinations.forEach(async (destination) => {
          const x = JSON.parse(destination);
          console.log(x);
          console.log(x.accomodationId, req.params.id, '---');
          if (x.accomodationId == req.params.id) {
            isAccommodationFound = true;
          }
        });
      });
    }
    console.log(isAccommodationFound);
    if (isAccommodationFound) {
      next(id);
    } else {
      throw new NotFoundError('Accommodation have never visited');
    }
  } catch (err) {
    next(err);
  }
};
