import { Request, Router, Response } from 'express';


export const SiteRouter = Router();

const getBucketContents = async (req: Request, res: Response) => {
    res.render('home', { layout: 'default', template: 'home-template' });
}
SiteRouter.get('/', getBucketContents);