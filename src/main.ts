import express from 'express';
import { S3Router } from './routers/S3Router';

const app = express();
app.use('/s3', S3Router)

app.listen(process.env.PORT || 1281)