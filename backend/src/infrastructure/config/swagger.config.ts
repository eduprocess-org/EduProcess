import swaggerJsdoc from 'swagger-jsdoc';

const API_URL = process.env.API_URL || `http://localhost:${process.env.PORT || 3000}`;
const SWAGGER_ENABLED = process.env.SWAGGER_ENABLED !== 'false';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EduProcess API',
      version: '1.0.0',
      description: 'Academic procedures management system for Universidad Central del Ecuador (UCE)',
    },
    servers: [
      {
        url: API_URL,
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            email: { type: 'string', format: 'email' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            career: { type: 'string' },
            role: { type: 'string', enum: ['student', 'admin'] },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 },
          },
        },
        RegisterRequest: {
          type: 'object',
          required: ['email', 'password', 'firstName', 'lastName', 'careerId'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            careerId: { type: 'string', format: 'uuid' },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                user: { $ref: '#/components/schemas/User' },
                tokens: {
                  type: 'object',
                  properties: {
                    sessionToken: { type: 'string' },
                    refreshToken: { type: 'string' },
                  },
                },
              },
            },
          },
        },
        ProcedureType: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            description: { type: 'string' },
            facultyId: { type: 'string', format: 'uuid', nullable: true },
            careerId: { type: 'string', format: 'uuid', nullable: true },
            isActive: { type: 'boolean' },
          },
        },
        ProcedureRequest: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            studentId: { type: 'string', format: 'uuid' },
            procedureTypeId: { type: 'string', format: 'uuid' },
            procedureName: { type: 'string' },
            faculty: { type: 'string' },
            career: { type: 'string' },
            status: { type: 'string', enum: ['pending', 'in_review', 'approved', 'rejected'] },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Observation: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            requestId: { type: 'string', format: 'uuid' },
            adminId: { type: 'string', format: 'uuid' },
            adminName: { type: 'string' },
            comment: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Notification: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            userId: { type: 'string', format: 'uuid' },
            title: { type: 'string' },
            message: { type: 'string' },
            isRead: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Career: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            description: { type: 'string' },
            facultyId: { type: 'string', format: 'uuid' },
            faculty: {
              type: 'object',
              properties: {
                id: { type: 'string', format: 'uuid' },
                name: { type: 'string' },
              },
            },
          },
        },
        AdminProcedure: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            description: { type: 'string' },
            facultyId: { type: 'string', format: 'uuid', nullable: true },
            careerId: { type: 'string', format: 'uuid', nullable: true },
            isActive: { type: 'boolean' },
            requirements: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string', format: 'uuid' },
                  name: { type: 'string' },
                  description: { type: 'string' },
                  isRequired: { type: 'boolean' },
                },
              },
            },
          },
        },
        DashboardStats: {
          type: 'object',
          properties: {
            totalRequests: { type: 'integer' },
            pendingRequests: { type: 'integer' },
            approvedRequests: { type: 'integer' },
            rejectedRequests: { type: 'integer' },
            inReviewRequests: { type: 'integer' },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {},
            message: { type: 'string' },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    paths: {
      '/api/v1/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'User login',
          description: 'Authenticate user with email and password',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/LoginRequest' },
              },
            },
          },
          responses: {
            '200': {
              description: 'Login successful',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/AuthResponse' },
                },
              },
            },
            '401': {
              description: 'Invalid credentials',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
          },
        },
      },
      '/api/v1/auth/register': {
        post: {
          tags: ['Auth'],
          summary: 'User registration',
          description: 'Register a new student account',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/RegisterRequest' },
              },
            },
          },
          responses: {
            '201': {
              description: 'Registration successful',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/AuthResponse' },
                },
              },
            },
            '400': {
              description: 'Validation error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
          },
        },
      },
      '/api/v1/auth/refresh': {
        post: {
          tags: ['Auth'],
          summary: 'Refresh access token',
          description: 'Get new session token using refresh token',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['refreshToken'],
                  properties: {
                    refreshToken: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Token refreshed',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/AuthResponse' },
                },
              },
            },
            '401': {
              description: 'Invalid refresh token',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
          },
        },
      },
      '/api/v1/auth/me': {
        get: {
          tags: ['Auth'],
          summary: 'Get current user',
          description: 'Get authenticated user profile',
          security: [{ bearerAuth: [] }],
          responses: {
            '200': {
              description: 'User profile',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: { $ref: '#/components/schemas/User' },
                    },
                  },
                },
              },
            },
            '401': {
              description: 'Unauthorized',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
          },
        },
      },
      '/api/v1/procedures': {
        get: {
          tags: ['Procedures'],
          summary: 'Get all procedure types',
          description: 'Get list of available procedure types. Public endpoint.',
          responses: {
            '200': {
              description: 'List of procedure types',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/ProcedureType' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/procedures/{id}': {
        get: {
          tags: ['Procedures'],
          summary: 'Get procedure type by ID',
          description: 'Get details of a specific procedure type',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            '200': {
              description: 'Procedure type details',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: { $ref: '#/components/schemas/ProcedureType' },
                    },
                  },
                },
              },
            },
            '404': {
              description: 'Procedure type not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
          },
        },
      },
      '/api/v1/requests': {
        post: {
          tags: ['Student Requests'],
          summary: 'Create a procedure request',
          description: 'Submit a new procedure request',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['procedureTypeId'],
                  properties: {
                    procedureTypeId: { type: 'string', format: 'uuid' },
                  },
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Request created',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: { $ref: '#/components/schemas/ProcedureRequest' },
                    },
                  },
                },
              },
            },
            '400': {
              description: 'Validation error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
          },
        },
      },
      '/api/v1/requests/{id}': {
        get: {
          tags: ['Student Requests'],
          summary: 'Get request by ID',
          description: 'Get details of a specific procedure request',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            '200': {
              description: 'Request details',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: { $ref: '#/components/schemas/ProcedureRequest' },
                    },
                  },
                },
              },
            },
            '404': {
              description: 'Request not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
          },
        },
      },
      '/api/v1/requests/{id}/status': {
        patch: {
          tags: ['Student Requests'],
          summary: 'Update request status',
          description: 'Update the status of a procedure request',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['status'],
                  properties: {
                    status: { type: 'string', enum: ['pending', 'in_review', 'approved', 'rejected'] },
                    comment: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Status updated',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SuccessResponse' },
                },
              },
            },
          },
        },
      },
      '/api/v1/requests/{id}/timeline': {
        get: {
          tags: ['Student Requests'],
          summary: 'Get request timeline',
          description: 'Get timeline of status changes and observations',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            '200': {
              description: 'Request timeline',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: { type: 'string' },
                            action: { type: 'string' },
                            description: { type: 'string' },
                            createdAt: { type: 'string', format: 'date-time' },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/careers': {
        get: {
          tags: ['Careers'],
          summary: 'Get all careers',
          description: 'Get list of careers with faculty info. Public endpoint.',
          responses: {
            '200': {
              description: 'List of careers',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Career' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/admin/dashboard/stats': {
        get: {
          tags: ['Admin Dashboard'],
          summary: 'Get dashboard statistics',
          description: 'Get overview statistics for admin dashboard',
          security: [{ bearerAuth: [] }],
          responses: {
            '200': {
              description: 'Dashboard statistics',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: { $ref: '#/components/schemas/DashboardStats' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/admin/requests': {
        get: {
          tags: ['Admin Requests'],
          summary: 'Get all requests',
          description: 'Get paginated list of procedure requests with filters',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
            { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
            { name: 'status', in: 'query', schema: { type: 'string', enum: ['pending', 'in_review', 'approved', 'rejected'] } },
            { name: 'procedureType', in: 'query', schema: { type: 'string' } },
          ],
          responses: {
            '200': {
              description: 'Paginated list of requests',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: {
                        type: 'object',
                        properties: {
                          requests: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/ProcedureRequest' },
                          },
                          total: { type: 'integer' },
                          page: { type: 'integer' },
                          totalPages: { type: 'integer' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/admin/requests/{id}/status': {
        patch: {
          tags: ['Admin Requests'],
          summary: 'Update request status (Admin)',
          description: 'Admin endpoint to update request status with comment',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['status'],
                  properties: {
                    status: { type: 'string', enum: ['pending', 'in_review', 'approved', 'rejected'] },
                    comment: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Status updated',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SuccessResponse' },
                },
              },
            },
          },
        },
      },
      '/api/v1/admin/procedures': {
        get: {
          tags: ['Admin Procedures'],
          summary: 'Get all procedures (Admin)',
          description: 'Get list of all procedure types including inactive',
          security: [{ bearerAuth: [] }],
          responses: {
            '200': {
              description: 'List of procedures',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/AdminProcedure' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['Admin Procedures'],
          summary: 'Create procedure type',
          description: 'Create a new procedure type',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AdminProcedure' },
              },
            },
          },
          responses: {
            '201': {
              description: 'Procedure created',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: { $ref: '#/components/schemas/AdminProcedure' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/admin/procedures/{id}': {
        get: {
          tags: ['Admin Procedures'],
          summary: 'Get procedure by ID (Admin)',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            '200': {
              description: 'Procedure details',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: { $ref: '#/components/schemas/AdminProcedure' },
                    },
                  },
                },
              },
            },
          },
        },
        put: {
          tags: ['Admin Procedures'],
          summary: 'Update procedure type',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AdminProcedure' },
              },
            },
          },
          responses: {
            '200': {
              description: 'Procedure updated',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: { $ref: '#/components/schemas/AdminProcedure' },
                    },
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ['Admin Procedures'],
          summary: 'Delete procedure type (soft delete)',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            '200': {
              description: 'Procedure deleted',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SuccessResponse' },
                },
              },
            },
          },
        },
      },
      '/api/v1/observations/{requestId}': {
        get: {
          tags: ['Observations'],
          summary: 'Get observations for a request',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'requestId',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            '200': {
              description: 'List of observations',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Observation' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['Observations'],
          summary: 'Create observation',
          description: 'Add an observation to a request',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'requestId',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['comment'],
                  properties: {
                    comment: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Observation created',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: { $ref: '#/components/schemas/Observation' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/observations/{id}': {
        delete: {
          tags: ['Observations'],
          summary: 'Delete observation',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            '200': {
              description: 'Observation deleted',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SuccessResponse' },
                },
              },
            },
          },
        },
      },
      '/api/v1/notifications': {
        get: {
          tags: ['Notifications'],
          summary: 'Get user notifications',
          security: [{ bearerAuth: [] }],
          responses: {
            '200': {
              description: 'List of notifications',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Notification' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/notifications/{id}/read': {
        patch: {
          tags: ['Notifications'],
          summary: 'Mark notification as read',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            '200': {
              description: 'Notification marked as read',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SuccessResponse' },
                },
              },
            },
          },
        },
      },
      '/api/v1/notifications/read-all': {
        patch: {
          tags: ['Notifications'],
          summary: 'Mark all notifications as read',
          security: [{ bearerAuth: [] }],
          responses: {
            '200': {
              description: 'All notifications marked as read',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SuccessResponse' },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
