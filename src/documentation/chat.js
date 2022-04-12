export const chats = {
  '/api/v1/chats': {
    get: {
      tags: ['chats'],
      summary: 'This is the endpoint to retrieve chat messages',
      description: 'This is the endpoint to retrieve chat messages',
      operationId: 'get messages',
      responses: {
        200: {
          description: 'Chats retrieved successfully',
        },
        400: {
          description: 'Bad Request',
        },
      },
    },
  },
};
