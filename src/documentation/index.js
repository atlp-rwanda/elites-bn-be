import welcome from './welcome';
import { users, userDefinition } from './users.docs';
import { trips, tripDefinitions } from './trips.docs';
import { rooms, roomsDefinitions } from './rooms.docs';
import { accomodations } from './accomodation.docs';
import { location, locationsDefinitions } from './locations.docs';
<<<<<<< HEAD
import { profile } from './profile.docs';
=======
import { tripComment, tripCommentDefinitions } from './tripComment.docs';
>>>>>>>  This is a combination of 11 commits.

const paths = {
  ...welcome,
  ...users,
<<<<<<< HEAD
  ...profile,
=======
>>>>>>>  This is a combination of 11 commits.
  ...trips,
  ...accomodations,
  ...rooms,
  ...location,
<<<<<<< HEAD
=======
  ...tripComment,

>>>>>>>  This is a combination of 11 commits.
};

const definitions = {
  ...userDefinition,
  ...tripDefinitions,
  ...roomsDefinitions,
  ...locationsDefinitions,
<<<<<<< HEAD
=======
  ...tripCommentDefinitions
>>>>>>>  This is a combination of 11 commits.
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
