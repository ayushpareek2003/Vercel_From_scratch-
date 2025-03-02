import {S3} from "aws-sdk"
import fs from "fs";
import path, { resolve } from "path"



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

 export async function downloadS3Folder(prefix:string){
    const allfiles= await s3.listObjectsV2({
        Bucket: "vercel",
        Prefix: prefix
    }).promise();

    const allPromises= allfiles.Contents?.forEach(async ({Key})=>{
        // let key string=Key
        const finalOutputPath=path.join(__dirname, Key||"");
        const dirname= path.dirname(finalOutputPath);

        if(!fs.existsSync(dirname)){
            fs.mkdirSync(dirname, {recursive:true});
        }

        const output=fs.createWriteStream(finalOutputPath);

        s3.getObject({
            Bucket:"vercel",
            Key: Key || ""
        }).createReadStream().pipe(output).on("finish",()=> {
            resolve("");
        })

    }) || []

    console.log("Waiting")
    await Promise.all(allPromises?.filter(x=>x!=undefined));


 }

 export {};