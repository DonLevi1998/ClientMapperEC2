import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/listProductsRouter.js'];

const doc = {
    info: {
        title: 'Products Read API',
        description: 'API for listing products',
    },
    host: 'localhost:5002',
    schemes: ['http', 'https'],
};

swaggerAutogen()(outputFile, endpointsFiles, doc);
