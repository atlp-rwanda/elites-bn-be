const welcome = {
  '/api/v1': {
    get: {
      tag: ['Home'],
      description: 'welcome page',
      operationId: 'getHome',
      responses: {
        200: {
          description: 'success',
        },
      },
    },
  },

};

export default welcome;
