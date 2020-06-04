import { Request, Router, Response } from 'express';
import { S3Service } from '../services/S3Service/S3Service'
import { S3 } from 'aws-sdk';
import * as bodyparser from 'body-parser';


export const S3Router = Router()

const getBucketContents = async (req: Request, res: Response) => {
    const bucketName = req.params.bucket;
    S3Service.getBucketContents(bucketName)

}

// async function getIps(): Promise<Array<IPv4>> {
//     const users = MurmurService.getUsers();
//     const output = new Array<IPv4>();
//     (await users).forEach((user) => {
//         output.push(new IPv4(user.address));
//     });
//     return output;
// }

// let isIpAddressOnline = async (req: Request, res: Response) => {
//     let ips = getIps()
//     let reqIp = new IPv4(req.params.ip);
//     if (reqIp.In(await ips)) {
//         res.send(true)
//     }
//     else {
//         res.send(false)
//     }
// };

// let sendMessageToIpChannel = async (req: Request, res: Response) => {
//     let body = (req.body as ipChannelJson)
//     await MurmurService.sendMessageToIpChannel(new IPv4(body.ip), body.message)
//     res.status(200)
//     res.send()
// }

S3Router.get("/bucket/:bucket", getBucketContents);
// MurmurRouter.get('/isConnected/:ip', isIpAddressOnline)

// MurmurRouter.route('/messageIp')
//     .post(bodyparser.json(), sendMessageToIpChannel)
//getIps().then((ips) => (console.log(ips))) 
