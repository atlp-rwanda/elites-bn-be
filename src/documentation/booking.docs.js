export const bookings = {
  '/api/v1/rooms/{roomId}/{tripId}/booking': {
    post: {
      tags: ['BOOKINGS'],
      summary: 'BOOKING A ROOM',
      description: 'This  endpoint will book a room',
      produces: ['application/json'],
      parameters: [
        {
          name: 'roomId',
          in: 'path',
          description: 'roomId',
          required: true,
        },
        {
          name: 'tripId',
          in: 'path',
          description: 'tripId',
          required: true,
        },
        {
          name: 'Body',
          in: 'body',
          description: 'checkinDate',
          required: true,
          schema: {
            $ref: '#/definitions/bookRoom',
          },
        },
      ],
      responses: {
        201: {
          description: 'Room booked successfully',
        },

        400: {
          description: 'Bad request',
        },
        500: {
          description: 'Internal server error',
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
  },

  '/api/v1/rooms/{roomId}/{tripId}/unbooking': {
    patch: {
      tags: ['BOOKINGS'],
      summary: 'UNBOOKING A ROOM',
      description: 'This  endpoint will unbook a room',
      produces: ['application/json'],
      parameters: [
        {
          name: 'roomId',
          in: 'path',
          description: 'roomId',
          required: true,
        },
        {
          name: 'tripId',
          in: 'path',
          description: 'tripId',
          required: true,
        },
      ],
      responses: {
        201: {
          description: 'Room unbooked successfully',
        },

        400: {
          description: 'Bad request',
        },
        500: {
          description: 'Internal server error',
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

export const bookingsDefinition = {
  bookRoom: {
    type: 'object',
    required: ['roomId', 'checkinDate', 'checkoutDate'],
    in: 'body',

    properties: {
      checkinDate: {
        type: 'string',
      },
      checkoutDate: {
        type: 'string',
      },
    },
  },
};
