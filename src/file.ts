
import fs from "fs";
import path from "path"


export const getAll=(folderPath:string)=>{
    let response: string[]=[];

    const allthings=fs.readdirSync(folderPath);
    allthings.forEach(file=>{
        const fullpath=path.join(folderPath,file);

        if(fs.statSync(fullpath).isDirectory()){
            response=response.concat(getAll(fullpath))

        }
        else{
            response.push(fullpath)
        }
    });
    return response


}


export {};