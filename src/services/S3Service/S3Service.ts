import { S3 } from "aws-sdk";
import { secretAccessKey, accessKey } from "../../env";

class DirectoryTree {
    public keys: (string | DirectoryTree)[];
    public path: string;

    constructor(keys: (string | DirectoryTree)[], path = '') {
        this.keys = keys;
        this.path = path;
    }
}

export abstract class S3Service {

    private static getFilebaseS3() {
        return new S3({
            endpoint: "https://s3.filebase.com",
            secretAccessKey: secretAccessKey,
            accessKeyId: accessKey
        });
    }

    public static async getBucketContents(bucketName: string): Promise<string[]> {
        const output: string[] = [];
        const s3 = this.getFilebaseS3();
        const params: S3.ListObjectsV2Request = { Bucket: bucketName };
        let moreObjects = true;

        while (moreObjects) {
            const response = await s3.listObjectsV2(params).promise();
            const tmp = response.Contents!.map((val) => this.reduceToS3ObjectString(val));
            output.concat(tmp);
            if (response.NextContinuationToken) {
                params.ContinuationToken = response.ContinuationToken;
            }
            moreObjects = response.NextContinuationToken !== undefined;
        }
        return output;
    }

    public static constructDirectoryTree(keys: string[], path: string = ''): DirectoryTree {
        const directoryKeys: (DirectoryTree | string)[] = [];
        const saplings: Map<string, string[]> = new Map();
        for (let key of keys) {
            let preSlash = "";
            while (key) {
                let char = key[0];
                if (char !== "/") {
                    preSlash += char;
                }
                else {
                    if (!saplings.has(preSlash)) {
                        saplings.set(preSlash, [key]);
                    }
                    else {
                        saplings.get(preSlash)!.push(key);
                    }
                    break;
                }
                key = key.substring(1);
            }
            if (!key) directoryKeys.push(preSlash);
        };
        for (let path of saplings.keys()) {
            directoryKeys.push(this.constructDirectoryTree(saplings.get(path)!, path));
        }

        return new DirectoryTree(directoryKeys, path);
    }


    private static reduceToS3ObjectString(object: S3.Object): string {
        if (object.Key) {
            return object.Key
        }
        throw new ThisShouldntHappenException("S3 object didn't have a key");
    }


}

export class ThisShouldntHappenException extends Error {

    public err: Error;

    constructor(message: string) {
        super();
        this.err = new Error(message);
    }

    log() {

    }
}