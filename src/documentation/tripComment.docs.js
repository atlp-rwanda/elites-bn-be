export const tripComment = {
  "/api/v1/trips/{id}/comments": {
    post: {
      tags: ["CommentTrip"],
      summary:
        "This will allow a user with requester role to comment on a trip",
      description: "Add a comment ",
      produces: ["application/json"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "please add a trip id",
          required: true,
          type: "integer",
        },
        {
          name: "body",
          in: "body",
          description: "Add comment",
          required: true,
          schema: {
            $ref: "#/definitions/CommentTrip",
          },
        },
      ],
      responses: {
        201: {
          description: "Comment added successfuly!",
        },
        401: {
          description: "Authorized user !",
        },
        400: {
          description: "Bad request",
        },
        500: {
          description: "Server error!",
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
    get: {
      tags: ["CommentTrip"],
      summary: "This will display all comment on a travel",
      description: "Add a comment ",
      produces: ["application/json"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "please add a trip id",
          required: true,
          type: "integer",
        },
      ],
      responses: {
        200: {
          description: "Comment added successfuly!",
        },
        400: {
          description: "Bad request",
        },
        500: {
          description: "Server error!",
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
  },
  "/api/v1/comments/{id}": {
    delete: {
      tags: ["CommentTrip"],
      summary: "Owner of a comment can delete it",
      description: "Delete a comment ",
      produces: ["application/json"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "please add a commentId",
          required: true,
          type: "integer",
        },
      ],
      responses: {
        200: {
          description: "Comment deleted successfuly!",
        },
        400: {
          description: "Bad request",
        },
        401: {
          description: "Unauthorized User",
        },
        500: {
          description: "Server error!",
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

export const tripCommentDefinitions = {
  CommentTrip: {
    type: "object",
    in: "body",
    required: ["comment"],
    properties: {
      comment: {
        type: "string",
      },
    },
  },
};
