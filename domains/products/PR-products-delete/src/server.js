import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import deleteProductRouter from './routes/deleteProductRouter.js';
import morgan from 'morgan';
//import swaggerUi from 'swagger-ui-express';
//import swaggerDocument from './swagger.json' assert { type: "json" };

const app = express();
const PORT = 5001;

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
  res.send('Welcome to the Products Delete Microservice');
});

app.use('/api/products', deleteProductRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
