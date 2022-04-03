// eslint-disable-next-line import/prefer-default-export
export const profile = {
  '/api/v1/profiles': {
    post: {
      tags: ['profile setting'],
      summary: 'Create user profile',
      description: 'Create user profile',
      consumes: ['multipart/form-data'],
      operationsId: 'createProfile',
      parameters: [
        {
          in: 'formData',
          name: 'gender',
          description: 'gender',
          required: true,
          type: 'string',
        },
        {
          in: 'formData',
          name: 'birthdate',
          description: 'Birthdate',
          required: true,
          type: 'string',
        },
        {
          in: 'formData',
          name: 'language',
          description: 'language',
          required: true,
          type: 'string',
        },
        {
          in: 'formData',
          name: 'currency',
          description: 'currency',
          required: true,
          type: 'string',
        },
        {
          in: 'formData',
          name: 'residence',
          description: 'residence',
          required: true,
          type: 'string',
        },
        {
          in: 'formData',
          name: 'department',
          description: 'department',
          required: true,
          type: 'string',
        },
        {
          in: 'formData',
          name: 'passportNumber',
          description: 'passportNumber',
          required: true,
          type: 'string',
        },
        {
          in: 'formData',
          name: 'address',
          description: 'address',
          required: true,
          type: 'string',
        },
        {
          in: 'formData',
          name: 'picture',
          description: 'profile picture',
          type: 'file',
        },
      ],
      responses: {
        201: {
          description: 'profile created successfuly!',
        },
        400: {
          description: 'Bad request',
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },

    get: {
      tags: ['profile setting'],
      summary: 'profiles',
      description: 'profiles',
      responses: {
        200: {
          description: 'All profiles retrieved successfuly!',
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },

    patch: {
      tags: ['profile setting'],
      summary: 'This will update the profile of user',
      description: ' This will update the profile of user',
      produces: ['application/json'],
      parameters: [
        {
          in: 'formData',
          name: 'gender',
          description: 'gender',
          type: 'string',
        },
        {
          in: 'formData',
          name: 'birthdate',
          description: 'Birthdate',
          type: 'string',
        },
        {
          in: 'formData',
          name: 'language',
          description: 'language',
          type: 'string',
        },
        {
          in: 'formData',
          name: 'currency',
          description: 'currency',
          type: 'string',
        },
        {
          in: 'formData',
          name: 'residence',
          description: 'residence',
          type: 'string',
        },
        {
          in: 'formData',
          name: 'department',
          description: 'department of user',
          type: 'string',
        },
        {
          in: 'formData',
          name: 'picture',
          description: 'profile image',
          type: 'file',

        },
      ],
      responses: {
        200: {
          description: 'Accomodation updated successfully!',
        },
        404: {
          description: 'accomodation with that ID not found',
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
  },

  '/api/v1/profiles/{id}': {
    get: {
      tags: ['profile setting'],
      summary: 'This will retrieve single user profile',
      description: ' ',
      produces: ['application/json'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: ' Enter the id',
          required: true,
          type: 'integer',
        },
      ],
      responses: {
        200: {
          description: 'profile retrieved successfully!',
        },
        404: {
          description: 'no profile found with that ID',
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
  },
};
