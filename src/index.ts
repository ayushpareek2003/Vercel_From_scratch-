import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import {generate} from "./utils";
import { getAll } from "./file";
import path from "path"
import { uploadFile } from "./aws_flare";

import {createClient} from "redis"
const publisher=createClient();
publisher.connect();



const app=express();
app.use(cors())
app.use(express.json())





app.get("/",async(req,res)=>{
    console.log("ALL GOOD")

    const host=req.hostname;
    const id=host.split(".")[0];

})

app.get("/ping-vercel",(req,res)=>{
    res.json("Pong")

});


app.post("/deploy", async (req,res)=>{
    const url=req.body.repourl;
    const id=generate();
    await simpleGit().clone(url,`output/${id}`);
    const resp=getAll(`output/${id}`)
    
    resp.forEach(async file=>{
        await uploadFile(file.slice(__dirname.length +1),file);
    })

    publisher.lPush("unbuilded",id)

    res.json({"Id":id,"contains":resp})

})


app.listen(5000);
