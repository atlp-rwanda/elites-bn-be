// eslint-disable-next-line import/prefer-default-export
export const accomodations = {
  '/api/v1/accommodations': {
    post: {
      tags: ['Accommodations CRUD Operations'],
      summary: 'Create an accomodation',
      description: 'Create an accomodation',
      parameters: [
        {
          name: 'accommodationName',
          in: 'formData',
          description: 'Accomodation Name',
          required: true,
          type: 'string',
        },
        {
          name: 'description',
          in: 'formData',
          description: 'Accomodation description',
          required: true,
          type: 'string',
        },
        {
          name: 'images',
          in: 'formData',
          description: 'Accomodation images',
          type: 'file',
        },
        {
          name: 'amenities',
          in: 'formData',
          description: 'Accomodation amenities',
          type: 'array',
        },
        {
          name: 'geoCoordinates',
          in: 'formData',
          description: 'Longitute and latitude coordinates of accommodation',
          type: 'array',
        },
        {
          name: 'streetAddress',
          in: 'formData',
          description: 'street number',
          type: 'string',
          required: true,
        },
        {
          name: 'locationId',
          in: 'formData',
          description: 'location where accomodation is',
          type: 'integer',
          required: true,
        },
      ],
      responses: {
        201: {
          description: 'Accomodation created successfuly!',
        },
        500: {
          description: 'Server error',
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
    get: {
      tags: ['Accommodations CRUD Operations'],
      summary: 'Get all accommodations',
      description: 'Get all accommodations',
      responses: {
        200: {
          description: 'All accommodations retrieved successfuly!',
        },
      },
    },
  },
  '/api/v1/accommodations/in/{locationId}': {
    get: {
      tags: ['Accommodations CRUD Operations'],
      summary: 'This will retrieve accomodations in given location',
      description: ' ',
      produces: ['application/json'],
      parameters: [
        {
          name: 'locationId',
          in: 'path',
          description: ' Enter the location ID',
          required: true,
          type: 'integer',
        },
      ],
      responses: {
        200: {
          description: 'Accomodations retrieved successfully!',
        },
        404: {
          description: 'no accomodation found with that ID',
        },
      },
    },
  },
  '/api/v1/accommodations/{accommodationId}': {
    get: {
      tags: ['Accommodations CRUD Operations'],
      summary: 'This will retrieve accomodation by ID',
      description: ' ',
      produces: ['application/json'],
      parameters: [
        {
          name: 'accommodationId',
          in: 'path',
          description: ' Enter the accomodation ID',
          required: true,
          type: 'integer',
        },
      ],
      responses: {
        200: {
          description: 'Accomodation retrieved successfully!',
        },
        404: {
          description: 'no accomodation found with that ID',
        },
      },
    },
    patch: {
      tags: ['Accommodations CRUD Operations'],
      summary: 'This will update the accomodation with given ID',
      description: ' ',
      produces: ['application/json'],
      parameters: [
        {
          name: 'accommodationId',
          in: 'path',
          description: ' Enter accomodation ID in the path',
          required: true,
          type: 'integer',
        },
        {
          name: 'accommodationName',
          in: 'formData',
          description: 'Accomodation Name',
          type: 'string',
        },
        {
          name: 'description',
          in: 'formData',
          description: 'Accomodation description',
          type: 'string',
        },
        {
          name: 'images',
          in: 'formData',
          description: 'Accomodation images',
          type: 'file',
        },
        {
          name: 'amenities',
          in: 'formData',
          description: 'Accomodation amenities',
          type: 'array',
        },
        {
          name: 'geoCoordinates',
          in: 'formData',
          description: 'Longitute and latitude coordinates of accommodation',
          type: 'array',
        },
        {
          name: 'streetAddress',
          in: 'formData',
          description: 'street number',
          type: 'string',
        },
        {
          name: 'approvalStatus',
          in: 'formData',
          description: 'pending,accepted or rejected',
          type: 'string',
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
    delete: {
      tags: ['Accommodations CRUD Operations'],
      summary: 'This will delete an accomodation with given ID',
      description: ' ',
      produces: ['application/json'],
      parameters: [
        {
          name: 'accommodationId',
          in: 'path',
          descrpition: 'Please enter accomodation ID here',
          required: true,
          type: 'integer',
        },
      ],
      responses: {
        200: {
          description: 'Accomodation deleted Successfuly',
        },
        404: {
          description: 'Accomodation not found',
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
