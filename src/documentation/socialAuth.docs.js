export const socialAuth = {
  '/api/v1/users/auth/google': {
    get: {
      tags: ['SOCIAL AUTH'],
      summary: 'AUTHENTICATING WITH GOOGLE',
      description: 'This  endpoint will authenticate a user with Google',
      responses: {
        201: {
          description: 'authenticated with google successfully',
        },
        400: {
          description: 'Bad request',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
  '/api/v1/users/auth/facebook': {
    get: {
      tags: ['SOCIAL AUTH'],
      summary: 'AUTHENTICATING WITH  FACEBOOK',
      description: 'This  endpoint will authenticate a user with Facebook',
      responses: {
        201: {
          description: 'authenticated with facebook successfully',
        },
        400: {
          description: 'Bad request',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
};
