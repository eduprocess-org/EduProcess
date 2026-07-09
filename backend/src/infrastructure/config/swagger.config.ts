import swaggerJsdoc from 'swagger-jsdoc';

const API_URL = process.env.API_URL || `http://localhost:${process.env.PORT || 3000}`;

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
    security: [{ bearerAuth: [] }],
    paths: {
      // ==================== AUTH ====================
      '/api/v1/auth/register': {
        post: {
          tags: ['Auth'],
          summary: 'Register new student',
          security: [],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/RegisterRequest' } } },
          },
          responses: {
            '201': { description: 'Registration successful', content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } } },
            '400': { description: 'Validation error' },
          },
        },
      },
      '/api/v1/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'User login',
          security: [],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginRequest' } } },
          },
          responses: {
            '200': { description: 'Login successful', content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } } },
            '401': { description: 'Invalid credentials' },
          },
        },
      },
      '/api/v1/auth/refresh': {
        post: {
          tags: ['Auth'],
          summary: 'Refresh access token',
          security: [],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['refreshToken'],
                  properties: { refreshToken: { type: 'string' } },
                },
              },
            },
          },
          responses: {
            '200': { description: 'Token refreshed' },
            '401': { description: 'Invalid refresh token' },
          },
        },
      },
      '/api/v1/auth/me': {
        get: {
          tags: ['Auth'],
          summary: 'Get current user profile',
          responses: {
            '200': { description: 'User profile', content: { 'application/json': { schema: { type: 'object', properties: { success: { type: 'boolean' }, data: { $ref: '#/components/schemas/User' } } } } } },
            '401': { description: 'Unauthorized' },
          },
        },
      },
      '/api/v1/auth/logout': {
        post: {
          tags: ['Auth'],
          summary: 'Logout user',
          responses: {
            '200': { description: 'Logged out' },
          },
        },
      },
      // ==================== PROCEDURES ====================
      '/api/v1/procedures': {
        get: {
          tags: ['Procedures'],
          summary: 'Get all procedure types',
          responses: {
            '200': { description: 'List of procedures', content: { 'application/json': { schema: { type: 'object', properties: { success: { type: 'boolean' }, data: { type: 'array', items: { $ref: '#/components/schemas/ProcedureType' } } } } } } },
          },
        },
      },
      '/api/v1/procedures/{id}': {
        get: {
          tags: ['Procedures'],
          summary: 'Get procedure by ID',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          responses: {
            '200': { description: 'Procedure details' },
            '404': { description: 'Not found' },
          },
        },
      },
      // ==================== STUDENT REQUESTS ====================
      '/api/v1/requests': {
        get: {
          tags: ['Student Requests'],
          summary: 'Get my requests',
          responses: {
            '200': { description: 'List of requests' },
          },
        },
        post: {
          tags: ['Student Requests'],
          summary: 'Create a procedure request',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['procedureTypeId'],
                  properties: { procedureTypeId: { type: 'string', format: 'uuid' } },
                },
              },
            },
          },
          responses: {
            '201': { description: 'Request created' },
            '400': { description: 'Validation error' },
          },
        },
      },
      '/api/v1/requests/{id}/tracking': {
        get: {
          tags: ['Student Requests'],
          summary: 'Get request tracking',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          responses: {
            '200': { description: 'Request tracking data' },
          },
        },
      },
      '/api/v1/requests/{id}/timeline': {
        get: {
          tags: ['Student Requests'],
          summary: 'Get request timeline',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          responses: {
            '200': { description: 'Timeline array' },
          },
        },
      },
      '/api/v1/requests/{id}/status': {
        patch: {
          tags: ['Student Requests'],
          summary: 'Update request status (Admin)',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
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
            '200': { description: 'Status updated' },
          },
        },
      },
      // ==================== CAREERS ====================
      '/api/v1/careers': {
        get: {
          tags: ['Careers'],
          summary: 'Get all careers (public)',
          security: [],
          responses: {
            '200': { description: 'List of careers', content: { 'application/json': { schema: { type: 'object', properties: { success: { type: 'boolean' }, data: { type: 'array', items: { $ref: '#/components/schemas/Career' } } } } } } },
          },
        },
      },
      // ==================== ADMIN DASHBOARD ====================
      '/api/v1/admin/dashboard/stats': {
        get: {
          tags: ['Admin Dashboard'],
          summary: 'Get dashboard statistics',
          responses: {
            '200': { description: 'Dashboard stats', content: { 'application/json': { schema: { type: 'object', properties: { success: { type: 'boolean' }, data: { $ref: '#/components/schemas/DashboardStats' } } } } } },
          },
        },
      },
      '/api/v1/admin/dashboard/recent-requests': {
        get: {
          tags: ['Admin Dashboard'],
          summary: 'Get recent requests',
          responses: { '200': { description: 'Recent requests' } },
        },
      },
      '/api/v1/admin/dashboard/requests-by-procedure': {
        get: {
          tags: ['Admin Dashboard'],
          summary: 'Get requests grouped by procedure',
          responses: { '200': { description: 'Requests by procedure' } },
        },
      },
      // ==================== ADMIN REQUESTS ====================
      '/api/v1/admin/requests': {
        get: {
          tags: ['Admin Requests'],
          summary: 'Get all requests (paginated)',
          parameters: [
            { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
            { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
            { name: 'status', in: 'query', schema: { type: 'string', enum: ['pending', 'in_review', 'approved', 'rejected'] } },
          ],
          responses: { '200': { description: 'Paginated requests' } },
        },
      },
      '/api/v1/admin/requests/{id}': {
        get: {
          tags: ['Admin Requests'],
          summary: 'Get request by ID',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          responses: { '200': { description: 'Request details' } },
        },
      },
      '/api/v1/admin/requests/{id}/documents': {
        get: {
          tags: ['Admin Requests'],
          summary: 'Get request documents',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          responses: { '200': { description: 'Documents list' } },
        },
      },
      '/api/v1/admin/requests/{id}/history': {
        get: {
          tags: ['Admin Requests'],
          summary: 'Get request history',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          responses: { '200': { description: 'History list' } },
        },
      },
      '/api/v1/admin/requests/{id}/timeline': {
        get: {
          tags: ['Admin Requests'],
          summary: 'Get request timeline (admin)',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          responses: { '200': { description: 'Timeline' } },
        },
      },
      '/api/v1/admin/requests/{id}/status': {
        patch: {
          tags: ['Admin Requests'],
          summary: 'Update request status',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
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
          responses: { '200': { description: 'Status updated' } },
        },
      },
      // ==================== ADMIN PROCEDURES ====================
      '/api/v1/admin/procedures': {
        get: {
          tags: ['Admin Procedures'],
          summary: 'Get all procedures (including inactive)',
          responses: { '200': { description: 'List of procedures' } },
        },
        post: {
          tags: ['Admin Procedures'],
          summary: 'Create procedure type',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AdminProcedure' } } },
          },
          responses: { '201': { description: 'Procedure created' } },
        },
      },
      '/api/v1/admin/procedures/{id}': {
        get: {
          tags: ['Admin Procedures'],
          summary: 'Get procedure by ID',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          responses: { '200': { description: 'Procedure details' } },
        },
        put: {
          tags: ['Admin Procedures'],
          summary: 'Update procedure',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AdminProcedure' } } },
          },
          responses: { '200': { description: 'Procedure updated' } },
        },
        delete: {
          tags: ['Admin Procedures'],
          summary: 'Delete procedure (soft delete)',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          responses: { '200': { description: 'Procedure deleted' } },
        },
      },
      '/api/v1/admin/procedures/{id}/status': {
        patch: {
          tags: ['Admin Procedures'],
          summary: 'Toggle procedure active status',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { isActive: { type: 'boolean' } },
                },
              },
            },
          },
          responses: { '200': { description: 'Status toggled' } },
        },
      },
      // ==================== ADMIN OBSERVATIONS ====================
      '/api/v1/admin/requests/{requestId}/observations': {
        get: {
          tags: ['Admin Observations'],
          summary: 'Get observations for request',
          parameters: [{ name: 'requestId', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          responses: { '200': { description: 'Observations list' } },
        },
        post: {
          tags: ['Admin Observations'],
          summary: 'Create observation',
          parameters: [{ name: 'requestId', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['comment'],
                  properties: { comment: { type: 'string' } },
                },
              },
            },
          },
          responses: { '201': { description: 'Observation created' } },
        },
      },
      '/api/v1/admin/observations/{id}': {
        get: {
          tags: ['Admin Observations'],
          summary: 'Get observation by ID',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          responses: { '200': { description: 'Observation details' } },
        },
        delete: {
          tags: ['Admin Observations'],
          summary: 'Delete observation',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          responses: { '200': { description: 'Observation deleted' } },
        },
      },
      // ==================== NOTIFICATIONS ====================
      '/api/v1/notifications': {
        get: {
          tags: ['Notifications'],
          summary: 'Get user notifications',
          responses: { '200': { description: 'Notifications list' } },
        },
      },
      '/api/v1/notifications/{id}/read': {
        patch: {
          tags: ['Notifications'],
          summary: 'Mark notification as read',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          responses: { '200': { description: 'Marked as read' } },
        },
      },
      '/api/v1/notifications/read-all': {
        patch: {
          tags: ['Notifications'],
          summary: 'Mark all notifications as read',
          responses: { '200': { description: 'All marked as read' } },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
