export const notifications = {
  '/api/v1/notifications': {
    get: {
      tags: ['Notifications'],
      summary: 'Get all notifications of current user',
      description: 'get all notifications of current user',
      produces: ['application/json'],
      responses: {
        200: {
          description: 'All notifications retrieved successfuly!',
        },
        404: {
          description: 'No notifications found!',
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
    delete: {
      tags: ['Notifications'],
      summary: 'This will delete all notification of current user',
      description: 'Delete notifications',
      produces: ['application/json'],
      responses: {
        200: {
          description: 'Notifications deleted Successfuly',
        },
        404: {
          description: 'No notification found',
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
  },
  '/api/v1/notifications/{id}': {
    get: {
      tags: ['Notifications'],
      summary: 'This will retrieve a notification with given ID',
      description: 'retrieve a single notification ',
      produces: ['application/json'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: ' Enter a notification ID',
          required: true,
          type: 'integer',
        },
      ],
      responses: {
        200: {
          description: 'notification retrieved successfully!',
        },
        404: {
          description: 'no notification found with that ID',
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
    delete: {
      tags: ['Notifications'],
      summary: 'This will delete a notification with given ID',
      description: 'Delete a notification',
      produces: ['application/json'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          descrpition: 'Please enter a notification ID here',
          required: true,
          type: 'integer',
        },
      ],
      responses: {
        200: {
          description: 'Notification deleted Successfuly',
        },
        404: {
          description: 'Notification not found',
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
  },
  '/api/v1/notifications/subscribe': {
    patch: {
      tags: ['Notifications'],
      summary: 'This will activate email notifications',
      description: 'subscribe to notifications ',
      produces: ['application/json'],
      responses: {
        200: {
          description: 'You have subscribed successfully!',
        },
        409: {
          description: 'You are already subscribed',
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
  },
  '/api/v1/notifications/unsubscribe': {
    patch: {
      tags: ['Notifications'],
      summary: 'This will disable email notifications',
      description: 'unsubscribe to notifications ',
      produces: ['application/json'],
      responses: {
        200: {
          description: 'You have unsubscribed successfully!',
        },
        409: {
          description: 'You are already unsubscribed',
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
  },

  '/api/v1/notifications/markallasread': {
    patch: {
      tags: ['Notifications'],
      summary: 'User will be able to mark all as read',
      description: 'mark all as read to notifications ',
      produces: ['application/json'],

      parameters: [
        {
          name: 'id',
          in: 'path',
          description: ' Enter a notification ID',
          required: true,
          type: 'integer',
        },
      ],
      responses: {
        200: {
          description: 'Notifications marked as read, successfully!',
        },
        401: {
          description: 'No notifications found',
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
  },

  '/api/v1/notifications/markoneasread/{id}': {
    patch: {
      tags: ['Notifications'],
      summary: 'You will be able to mark one notification based on ID as read.',
      description: 'mark a single notification ',
      produces: ['application/json'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: ' Enter a notification ID',
          required: true,
          type: 'integer',
        },
      ],
      responses: {
        200: {
          description: 'notification marked successfully!',
        },
        404: {
          description: 'no notification found with that ID',
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
