import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import listProductsRouter from './routes/listProductsRouter.js';
import getProductByIdRouter from './routes/getProductByIdRouter.js';
import morgan from 'morgan';
//import swaggerUi from 'swagger-ui-express';
//import swaggerDocument from './swagger.json' assert { type: "json" };

const app = express();
const PORT = 5002;

const corsOptions = {
  origin: "http://localhost:4200",
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

//app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Welcome to the Products Read Microservice');
});

app.use('/api/products', listProductsRouter);
app.use('/api/products', getProductByIdRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
