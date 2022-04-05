export const chats = {
  '/api/v1/chat': {
    post: {
      tags: ['chats'],
      summary: 'This is the endpoint to post message',
      description: 'This is the endpoint to post message',
      operationId: 'Add message',
      parameters: [
        {
          name: 'body',
          in: 'body',
          description: 'Trip request',
          type: 'array',
          schema: {
            $ref: '#/definitions/chat',
          },
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
      // security: [
      //   {
      //     Bearer: [],
      //   },
      // ],
    },
    get: {
      tags: ['chats'],
      summary: 'This is the endpoint to post message',
      description: 'This is the endpoint to post message',
      operationId: 'get all past chats',

      responses: {
        200: {
          description: 'Successfully retrieved',
        },
        400: {
          description: 'Bad Request',
        },
      },
      // security: [
      //   {
      //     Bearer: [],
      //   },
      // ],
    },
  },
};

export const chatDefinitions = {
  chat: {
    type: 'object',
    in: 'body',
    properties: {
      postedBy: {
        type: 'integer',
      },
      sender: {
        type: 'string',
      },
      message: {
        type: 'string',
      },
    },
  },
};
