/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
// eslint-disable-next-line import/prefer-default-export
export const users = {
  '/api/v1/users/register': {
    post: {
      tags: ['Authentication'],
      summary: 'This will register a user',
      description: ' ',
      produces: ['application/json'],
      parameters: [
        {
          name: 'Body',
          in: 'body',
          required: true,
          schema: {
            $ref: '#/definitions/Register',
          },
        },
      ],
      responses: {
        201: {
          description: 'User registered successfully',
        },
        409: {
          description: 'User with given email already exists',
        },
        400: {
          description: 'Bad request',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
  "/api/v1/users/verifyEmail/{token}": {
    "get": {
      "tags": ["Authentication"],
      "summary": "This end Point will assist to verify a user with a token",
              "description": "This end Point will verify if a user is a really one who received the email",
              "operationId": "Vification User Registered",
      "produces": ["application/json"],
      "parameters": [
        {
          "name": "token",
          "in": "path",
          "required": true
        }
      ],
      "responses": {
        "200": {
          "description": "User verified successfully"
        },

        "401": {
          "description": "Unauthorized access"
        },
        "500": {
          "description": "Internal server error"
        }
      }
    }
  },


  '/api/v1/users/login': {
    post: {
      tags: ['Authentication'],
      summary: 'This will login a user',
      description: ' ',
      produces: ['application/json'],
      parameters: [
        {
          name: 'Body',
          in: 'body',
          required: true,
          schema: {
            $ref: '#/definitions/Login',
          },
        },
      ],
      responses: {
        200: {
          description: 'User Loged in successfully',
        },

        401: {
          description: 'Unauthorized access',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },

  '/api/v1/auth/logout': {
    			post: {
    				tag: ['Authentication'],
    				description: 'This will signout a user',
    				produces: ['application/json'],
    				parameters: [
    					{
    						name: 'Authorization',
    						in: 'header',
    						description: 'Authorization',
    						required: true,
    					},
    				],
    				responses: {
    					205: {
    						description: 'success',
    					},
    					500: {
    						description: 'Internal server error',
    					},
    					401: {
    						description: 'Bad request',
    					},
    				},
    			},
    		},
    		'/api/v1/users/refreshToken': {
    			post: {
    				tags: ['Authentication'],
    				summary: 'This is to use refresh token in order to create a new access token',
    				description: ' ',
    				consumes: ['application/json'],
    				produces: ['application/json'],
    				parameters: [
    					{
    						name: 'User Update section',
    						in: 'body',
    						description: 'Update user info',
    						required: true,
    						schema: {
    							$ref: '#/definitions/refreshToken',
    						},
    					},
    				],
    				responses: {
    					200: {
    						description: 'Access token created successfuly',
    					},
    					400: {
    						description: 'Bad request',
    					},
    					500: {
    						description: 'INternal server error',
    					},
    				},
    			},
    		},
  '/api/v1/users/updateRole/{id}': {
    patch: {
      tags: ['Users'],
      summary: 'This will update a role of the user',
      description: ' ',
      produces: ['application/json'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'id',
          required: true,
        },
        {
          name: 'Body',
          in: 'body',
          required: true,
          schema: {
            $ref: '#/definitions/UpdateRole',
          },
        },
      ],
      responses: {
        201: {
          description: 'User role updated successfully',
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

export const userDefinition = {
  Register: {
    type: 'object',
    in: 'body',
    required: ['names', 'email', 'password'],
    properties: {
      names: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    },
  },
  Login: {
    type: 'object',
    in: 'body',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    },
  },
  UpdateRole: {
    type: 'object',
    in: 'body',
    required: ['email', 'role'],
    properties: {
      email: {
        type: 'string',
      },
    },
  },
};