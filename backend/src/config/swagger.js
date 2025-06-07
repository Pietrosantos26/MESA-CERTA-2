const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MesaCerta API',
      version: '1.0.0',
      description: 'API documentation for the MesaCerta backend application.',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3001}`,
        description: 'Development Server',
      },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                // Note: The original project used x-auth-token. For Swagger UI to work easily,
                // it's better to use the standard Authorization header.
                // We can adjust the authMiddleware to support this.
            }
        },
        schemas: {
            User: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    username: { type: 'string' },
                    email: { type: 'string' },
                    created_at: { type: 'string', format: 'date-time' },
                }
            },
            Item: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    title: { type: 'string' },
                    description: { type: 'string' },
                    user_id: { type: 'integer' },
                    created_at: { type: 'string', format: 'date-time' },
                }
            },
            Restaurant: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    address: { type: 'string' },
                    cuisine: { type: 'string' },
                }
            },
            Reservation: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    user_id: { type: 'integer' },
                    restaurant_id: { type: 'integer' },
                    reservation_date: { type: 'string', format: 'date' },
                    reservation_time: { type: 'string', format: 'time' },
                    guests: { type: 'integer' },
                    status: { type: 'string' },
                }
            },
        }
    },
    paths: {
      // User Routes
      '/api/users/register': {
        post: {
          tags: ['Users'],
          summary: 'Register a new user',
          requestBody: { content: { 'application/json': { schema: { type: 'object', properties: { username: { type: 'string'}, email: {type: 'string'}, password: {type: 'string'} } } } } },
          responses: { '201': { description: 'User registered' } }
        }
      },
      '/api/users/login': {
        post: {
          tags: ['Users'],
          summary: 'Login a user',
          requestBody: { content: { 'application/json': { schema: { type: 'object', properties: { email: {type: 'string'}, password: {type: 'string'} } } } } },
          responses: { '200': { description: 'Login successful' } }
        }
      },
      '/api/users/profile': {
        get: {
          tags: ['Users'],
          summary: 'Get user profile',
          security: [{ bearerAuth: [] }],
          responses: { '200': { description: 'OK' } }
        }
      },
      // Restaurant Routes
      '/api/restaurants': {
        get: {
            tags: ['Restaurants'],
            summary: 'Get all restaurants',
            responses: { '200': { description: 'List of all restaurants' } }
        }
      },
      '/api/restaurants/{id}': {
        get: {
            tags: ['Restaurants'],
            summary: 'Get a restaurant by ID',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
            responses: { '200': { description: 'OK' }, '404': {description: 'Not Found'} }
        }
      },
      // Reservation Routes
      '/api/reservations': {
        post: {
            tags: ['Reservations'],
            summary: 'Create a new reservation',
            security: [{ bearerAuth: [] }],
            requestBody: { content: { 'application/json': { schema: { $ref: '#/components/schemas/Reservation' } } } },
            responses: { '201': { description: 'Created' } }
        }
      },
      '/api/reservations/my-reservations': {
        get: {
            tags: ['Reservations'],
            summary: 'Get my reservations',
            security: [{ bearerAuth: [] }],
            responses: { '200': { description: 'OK' } }
        }
      },
      '/api/reservations/{id}/cancel': {
        put: {
            tags: ['Reservations'],
            summary: 'Cancel a reservation',
            security: [{ bearerAuth: [] }],
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
            responses: { '200': { description: 'OK' }, '404': {description: 'Not Found'} }
        }
      }
    }
  },
  apis: [], // DEIXE ESTE ARRAY VAZIO!
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = { setupSwagger };
