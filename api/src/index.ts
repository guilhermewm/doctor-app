import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import { caseRoutes } from './routes/cases';
import { conditionRoutes } from './routes/conditions';
import { verifyToken } from './routes/validate-token';
import { ErrorHandler, handleError } from './utils/ErrorHandler';
import { authRoutes } from './routes/auth';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
const PORT = process.env.PORT || 3000;
const MONGODB = process.env.URL_MONGO || '';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/user", authRoutes);
app.use("/cases", verifyToken, caseRoutes);
app.use("/conditions", verifyToken, conditionRoutes);


app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  handleError(err, res);
})

mongoose.connect(MONGODB, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('🚀 Connected to database');
})

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
})

