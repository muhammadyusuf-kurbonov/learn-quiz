// Swagger/OpenAPI configuration
import swaggerJsdoc from 'swagger-jsdoc';
import { koaSwagger } from 'koa2-swagger-ui';
import { Application } from './declarations';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'QuizFromContent API',
      version: '1.0.0',
      description: 'A simple quiz content API built with FeathersJS and Koa',
    },
    servers: [
      {
        url: 'http://localhost:3030',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/services/**/*.ts'], // files containing annotations for swagger
};

export const specs = swaggerJsdoc(options);

export const configureSwagger = (app: Application) => {
  // Serve the Swagger UI
  const swaggerUi = koaSwagger({
    route: '/swagger',
    spec: specs,
  });

  // Add the Swagger UI middleware to the app
  app.use(swaggerUi);
};