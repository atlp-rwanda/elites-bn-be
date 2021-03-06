import welcome from './welcome';
import { users, userDefinition } from './users.docs';
import { trips, tripDefinitions } from './trips.docs';
import { rooms, roomsDefinitions } from './rooms.docs';
import { accomodations } from './accomodation.docs';
import { location, locationsDefinitions } from './locations.docs';
import { profile } from './profile.docs';
import { tripComment, tripCommentDefinitions } from './tripComment.docs';
import { bookings, bookingsDefinition } from './booking.docs';
import { notifications } from './notification.docs';
import { chats } from './chat';
import {
  AccommodationRating,
  AccommodationRatingDefinitions,
} from './accommodationRating.docs';
import { accommodationLike } from './accommodationLike.docs';
import { socialAuth } from './socialAuth.docs';

const paths = {
  ...welcome,
  ...users,
  ...socialAuth,
  ...profile,
  ...trips,
  ...accomodations,
  ...rooms,
  ...location,
  ...tripComment,
  ...bookings,
  ...notifications,
  ...chats,
  ...AccommodationRating,
  ...accommodationLike,
};

const definitions = {
  ...userDefinition,
  ...tripDefinitions,
  ...roomsDefinitions,
  ...locationsDefinitions,
  ...tripCommentDefinitions,
  ...bookingsDefinition,
  ...AccommodationRatingDefinitions,
};

const config = {
  swagger: '2.0',
  info: {
    title: 'BAREFOOT NOMAD API',
    description: 'This is team project,Elites team',
    version: '1.0.0',
    contact: {
      name: 'Developers',
      email: 'niyonzimadeus2002@gmail.com',
    },
  },

  schemes: ['HTTP', 'HTTPS'],

  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
    ApiKeyAuth: {
      type: 'apiKey',
      name: 'refreshToken',
      in: 'header',
    },
  },

  servers: [
    {
      url: 'http://localhost:3000',
      name: 'DEV',
    },
  ],

  paths,
  definitions,
};

export default config;
