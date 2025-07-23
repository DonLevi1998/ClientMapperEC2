import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import UpdateProductRouter from './routes/UpdateProductRouter.js';
import morgan from 'morgan'

//import swaggerUi from 'swagger-ui-express';
//import swaggerDocument from './swagger.json' assert { type: "json" };
const app = express();
const PORT = 5003;

const corsOptions = {
  origin: "http://localhost:4200",
  // origin: "http://54.147.184.127",
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(morgan('dev'))
app.use(express.json());
app.use(cookieParser()); 

app.use(express.json());

//app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post('/', (req, res) => {
  res.send('Welcome to the Products Microservice');
});

app.use('/api/products', UpdateProductRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
