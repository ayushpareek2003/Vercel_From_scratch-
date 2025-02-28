import {S3} from "aws-sdk"
import fs from "fs";




/////////apne daal bhai 
 const s3=new S3({
    accessKeyId:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    secretAccessKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    endpoint: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
 })



 export const uploadFile=async(filename:string, localFilePath: string)=>{
        const fileContent=fs.readFileSync(localFilePath)

        const response= await s3.upload({
            Body: fileContent,
            Bucket: "folder ka naam",  
            Key: filename,
        }).promise();


 }

 export {};