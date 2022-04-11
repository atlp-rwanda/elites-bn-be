export const AccommodationRating = {
  '/api/v1/accommodations/{id}/reviews': {
    post: {
      tags: ['Accommodation Review'],
      summary: 'Add reviews',
      description: 'Add reviews',
      produces: ['application/json'],
      parameters: [{
        name: 'id',
        in: 'path',
        description: 'please add a accommodation id',
        required: true,
        type: 'integer',
      },
      {
        name: 'body',
        in: 'body',
        description: 'Add Rating',
        required: true,
        schema: {
          $ref: '#/definitions/rateAccommodation',
        },
      },
      ],
      responses: {
        201: {
          description: 'Comment added successfuly!',
        },
        401: {
          description: 'Authorized user !',
        },
        400: {
          description: 'Bad request',
        },
        500: {
          description: 'Server error!',
        },
      },
      security: [{
        Bearer: [],
      }],
    },
    get: {
      tags: ['Accommodation Review'],
      summary: 'view Reviews',
      description: 'view Review',
      produces: ['application/json'],
      parameters: [{
        name: 'id',
        in: 'path',
        description: 'please add a accommodation id',
        required: true,
        type: 'integer',
      }],
      responses: {
        201: {
          description: 'Comment added successfuly!',
        },
        401: {
          description: 'Authorized user !',
        },
        400: {
          description: 'Bad request',
        },
        500: {
          description: 'Server error!',
        },
      },
      security: [{
        Bearer: [],
      }],
    },
  },
};

export const AccommodationRatingDefinitions = {
  rateAccommodation: {
    type: 'object',
    in: 'body',
    required: ['rating', 'feedback'],
    properties: {
      rating: {
        type: 'integer',
      },
      feedback: {
        type: 'string',
      },
    },
  },
};
