import express from 'express';
import { S3Router } from './routers/S3Router';
import exphbs from "express-handlebars";
import { SiteRouter } from './routers/SiteRouter';

const app = express();
app.use('/', SiteRouter);
app.use('/s3', S3Router);

// https://hackersandslackers.com/handlebars-templates-expressjs/
app.set('view engine', 'hbs');
app.engine('hbs', exphbs({
    extname: 'hbs',
    layoutsDir: __dirname + '/views/pages/',
    partialsDir: __dirname + '/views/partials/'
}));

app.listen(process.env.PORT || 1281)