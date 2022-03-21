export const rooms = {
  '/api/v1/rooms': {
    post: {
      tags: ['Rooms CRUD Operations'],
      summary: 'Add a room',
      description: 'add a room to accommodation',
      parameters: [
        {
          name: 'body',
          in: 'body',
          description: 'Send a message',
          required: true,
          schema: {
            $ref: '#/definitions/Room',
          },
        },
      ],
      responses: {
        201: {
          description: 'Room added to accommodation successfuly!',
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
  '/api/v1/accommodations/{accommodationId}/rooms': {
    get: {
      tags: ['Rooms CRUD Operations'],
      summary: 'Get all rooms of an accammodation',
      description: 'get all rooms in a single accommodation',
      produces: ['application/json'],
      parameters: [
        {
          name: 'accommodationId',
          in: 'path',
          description: ' Enter accommodation ID',
          required: true,
          type: 'integer',
        },
      ],
      responses: {
        200: {
          description: 'All rooms retrieved successfuly!',
        },
      },
    },
  },
  '/api/v1/rooms/{roomId}': {
    get: {
      tags: ['Rooms CRUD Operations'],
      summary: 'This will retrieve a room with given ID',
      description: 'retrieve a single room ',
      produces: ['application/json'],
      parameters: [
        {
          name: 'roomId',
          in: 'path',
          description: ' Enter a room ID',
          required: true,
          type: 'integer',
        },
      ],
      responses: {
        200: {
          description: 'room retrieved successfully!',
        },
        404: {
          description: 'no room found with that ID',
        },
      },
    },
    patch: {
      tags: ['Rooms CRUD Operations'],
      summary: 'uptade a room',
      description: 'update a room',
      parameters: [
        {
          name: 'roomId',
          in: 'path',
          description: ' Enter a room ID',
          required: true,
          type: 'integer',
        },
        {
          name: 'body',
          in: 'body',
          description: 'Enter the updates',
          required: true,
          schema: {
            $ref: '#/definitions/Room',
          },
        },
      ],
      responses: {
        200: {
          description: 'Room updated successfuly!',
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
      tags: ['Rooms CRUD Operations'],
      summary: 'This will delete a room with given ID',
      description: 'Delete a room',
      produces: ['application/json'],
      parameters: [
        {
          name: 'roomId',
          in: 'path',
          descrpition: 'Please enter a room ID here',
          required: true,
          type: 'integer',
        },
      ],
      responses: {
        200: {
          description: 'Room deleted Successfuly',
        },
        404: {
          description: 'Room not found',
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

export const roomsDefinitions = {
  Room: {
    type: 'object',
    required: [
      'roomType',
      'roomNumber',
      'price',
      'currency',
      'accommodationId',
    ],
    properties: {
      roomType: {
        type: 'string',
      },
      roomNumber: {
        type: 'string',
      },
      price: {
        type: 'integer',
      },
      currency: {
        type: 'string',
      },
      isAvailable: {
        type: 'boolean',
      },
      accommodationId: {
        type: 'integer',
      },
    },
  },
};
