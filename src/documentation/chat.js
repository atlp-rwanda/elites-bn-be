export const chats = {
  '/api/v1/chats': {
    get: {
      tags: ['chats'],
      summary: 'This is the endpoint to retrieve chart message',
      description: 'This is the endpoint to retrieve chart message',
      operationId: 'Add message',
      responses: {
        200: {
          description: 'Trip request created successfull',
        },
        400: {
          description: 'Bad Request',
        },
      },
    },
  },
};
