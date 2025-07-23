import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/updateProductRouter.js'];

const doc = {
    info: {
        title: 'Products Update API',
        description: 'API for updating products',
    },
    host: 'localhost:5003',
    schemes: ['http', 'https'],
};

swaggerAutogen()(outputFile, endpointsFiles, doc);
