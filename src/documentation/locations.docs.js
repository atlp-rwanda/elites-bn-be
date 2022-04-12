export const location = {
  '/api/v1/locations': {
    post: {
      tags: ['Locations'],
      summary: 'Add a location',
      description: 'add a location ',
      parameters: [
        {
          name: 'body',
          in: 'body',
          description: 'add a location',
          required: true,
          schema: {
            $ref: '#/definitions/Location',
          },
        },
      ],
      responses: {
        201: {
          description: 'Location added successfuly!',
        },
        500: {
          description: 'Server error!',
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
  },
  '/api/v1/locations/mostTravelled/all': {
    get: {
      tags: ['Locations'],
      summary: 'Retrieve Locations by Most travelled',
      description: 'add a location ',

      responses: {
        200: {
          description: 'Most travelled Location retrieved successfuly!',
        },
        500: {
          description: 'Server error!',
        },
      },
    },
  },
  '/api/v1/locations/{locationId}': {
    get: {
      tags: ['Locations'],
      summary: 'This will retrieve a location with given ID',
      description: 'retrieve a single location ',
      produces: ['application/json'],
      parameters: [
        {
          name: 'locationId',
          in: 'path',
          description: ' Enter a location ID',
          required: true,
          type: 'integer',
        },
      ],
      responses: {
        200: {
          description: 'location retrieved successfully!',
        },
        404: {
          description: 'no location found with that ID',
        },
      },
    },
    patch: {
      tags: ['Locations'],
      summary: 'uptade a location',
      description: 'update a location',
      parameters: [
        {
          name: 'locationId',
          in: 'path',
          description: ' Enter a location ID',
          required: true,
          type: 'integer',
        },
        {
          name: 'body',
          in: 'body',
          description: 'Enter the location updates',
          required: true,
          schema: {
            $ref: '#/definitions/Location',
          },
        },
      ],
      responses: {
        200: {
          description: 'Location updated successfuly!',
        },
        500: {
          description: 'Server error!',
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
    delete: {
      tags: ['Locations'],
      summary: 'This will delete a location with given ID',
      description: 'Delete a location',
      produces: ['application/json'],
      parameters: [
        {
          name: 'locationId',
          in: 'path',
          descrpition: 'Please enter a location ID here',
          required: true,
          type: 'integer',
        },
      ],
      responses: {
        200: {
          description: 'Location deleted Successfuly',
        },
        404: {
          description: 'Location not found',
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

export const locationsDefinitions = {
  Location: {
    type: 'object',
    properties: {
      locationName: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      country: {
        type: 'string',
      },
    },
  },
};
