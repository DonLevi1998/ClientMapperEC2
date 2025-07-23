import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/deleteProductRouter.js'];

const doc = {
    info: {
        title: 'Products Delete API',
        description: 'API for deleting products',
    },
    host: 'localhost:5001',
    schemes: ['http', 'https'],
};

swaggerAutogen()(outputFile, endpointsFiles, doc);
