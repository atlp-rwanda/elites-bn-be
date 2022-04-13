export const bookings = {
  '/api/v1/rooms/{roomId}/booking': {
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
          name: 'Body',
          in: 'body',
          description: 'Dates and tripId',
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
  '/api/v1/rooms/{roomId}/unbooking': {
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
          name: 'Body',
          in: 'body',
          description: 'tripId',
          required: true,
          schema: {
            $ref: '#/definitions/unbookRoom',
          },
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
    required: ['roomId', 'checkinDate', 'checkoutDate', 'tripId'],
    in: 'body',
    properties: {
      tripId: {
        type: 'integer',
      },
      checkinDate: {
        type: 'string',
      },
      checkoutDate: {
        type: 'string',
      },
    },
  },
  unbookRoom: {
    type: 'object',
    required: ['roomId', 'tripId'],
    in: 'body',
    properties: {
      tripId: {
        type: 'integer',
      },
    },
  },
};
