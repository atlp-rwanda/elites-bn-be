export const trips = {
  '/api/v1/trips': {
    post: {
      tags: ['Trip Request'],
      summary: 'This is the endpoint to request a trip by user',
      description: 'This is the endpoint to request trip by user',
      operationId: 'Add tripRequest',
      parameters: [
        {
          name: 'body',
          in: 'body',
          description: 'Trip request',
          type: 'array',
        },
      ],
      responses: {
        201: {
          description: 'Trip request created successfull',
        },
        400: {
          description: 'Bad Request',
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
    get: {
      tags: ['Trip Request'],
      summary: 'This endPoint will retrieve all requests ',
      description: 'This endPoint will retrieve all requests ',
      operationId: 'getAllRequest',
      responses: {
        200: {
          description: 'Successfully retrieved',
        },
        400: {
          description: 'Bad Request',
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
  },

  '/api/v1/trips/{id}': {
    get: {
      tags: ['Trip Request'],
      summary: 'This endPoint will retrieve one request ',
      description: 'This endPoint will retrieve one request ',
      operationId: 'getOneRequest',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'Trip request id',
          required: true,
          type: 'integer',
        },
      ],

      responses: {
        200: {
          description: 'Successfully retrieved',
        },
        400: {
          description: 'Bad Request',
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
    put: {
      tags: ['Trip Request'],
      summary: 'update request with pending status',
      description: ' update request with pending status',
      operationId: 'updateRequest',
      produces: ['application/json'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          type: 'integer',
        },
        {
          name: 'body',
          in: 'body',
          required: true,
          description: 'Trip request',
          schema: {
            $ref: '#/definitions/trip',
          },
        },
      ],
      responses: {
        200: {
          description: 'successfully updated user with given id',
        },
        409: {
          description: 'please fill in all fields',
        },
        404: {
          description: 'user you want to update does not exist',
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },

    delete: {
      tags: ['Trip Request'],
      summary:
        'This end Point will delete the pending request sent by requester',
      description:
        'This end Point will delete the pending request sent by requester',
      operationId: 'delete Request',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'Trip request id',
          required: true,
          type: 'integer',
        },
      ],

      responses: {
        204: {
          description: 'SUCCESSFULLY DELETED',
        },
        404: {
          description: 'NOT FOUND',
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
    patch: {
      tags: ['Trip Request'],
      summary:
        '  Manager can update request with pending status to approved or rejected',
      description: 'Manager can update request with pending status',
      operationId: 'updateRequest',
      produces: ['application/json'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          type: 'integer',
        },
        {
          name: 'body',
          in: 'body',
          required: true,
          description: 'Trip request',
          schema: {
            $ref: '#/definitions/trips',
          },
        },
      ],
      responses: {
        200: {
          description: 'successfully updated user with given id',
        },
        409: {
          description: 'please fill in all fields',
        },
        404: {
          description: 'user you want to update does not exist',
        },
        400: {
          description: 'Bad Request',
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

export const tripDefinitions = {
  trip: {
    type: 'object',
    in: 'body',
    properties: {
      departLocation: {
        type: 'integer',
      },
      arrivalLocation: {
        type: 'integer',
      },
      tripReason: {
        type: 'string',
      },
      departDate: {
        type: 'string',
      },
      returnDate: {
        type: 'string',
      },
      accomodationId: {
        type: 'integer',
      },
    },
  },
  trips: {
    type: 'object',
    in: 'body',
    properties: {
      status: {
        type: 'string',
      },
    },
  },
};
