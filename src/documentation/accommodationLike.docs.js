export const accommodationLike = {
  '/api/v1/accommodations/{id}/like': {
    post: {
      tags: ['Accommodations CRUD Operations'],
      summary: 'like an accommodation',
      description: 'like an accommodation',
      parameters: [{
        name: 'id',
        in: 'path',
        description: 'please add a accommodation id',
        required: true,
        type: 'integer',
      }],
      responses: {
        200: {
          description: 'Accommodation liked successfully!',
        },
        500: {
          description: 'Server error',
        },
      },
      security: [{
        Bearer: [],
      }],
    },
  },
  '/api/v1/accommodations/{id}/dislike': {
    post: {
      tags: ['Accommodations CRUD Operations'],
      summary: 'dislike an accommodation',
      description: 'dislike an accommodation',
      parameters: [{
        name: 'id',
        in: 'path',
        description: 'please add a accommodation id',
        required: true,
        type: 'integer',
      }],
      responses: {
        200: {
          description: 'Accommodation liked successfully!',
        },
        500: {
          description: 'Server error',
        },
      },
      security: [{
        Bearer: [],
      }],
    },
  },
  '/api/v1/accommodations/{id}/likes': {
    get: {
      tags: ['Accommodations CRUD Operations'],
      summary: 'likes and dislikes of an accommodation',
      description: 'likes and dislikes of an accommodation',
      parameters: [{
        name: 'id',
        in: 'path',
        description: 'please add a accommodation id',
        required: true,
        type: 'integer',
      }],
      responses: {
        200: {
          description: 'accommodation liked successfully!',
        },
        500: {
          description: 'Server error',
        },
      },
      security: [{
        Bearer: [],
      }],
    },
  },
};
