import { createClient, commandOptions } from "redis";
import { downloadS3Folder } from "./aws_flare";
import path from "path"
import {exec, spawn} from "child_process"

async function main() {
    const cli = createClient();

    
    await cli.connect();
    console.log("Connected to Redis. Waiting for messages...");

    while (true) {
        try {
            const response = await cli.brPop(
                commandOptions({ isolated: true }),
                'build-queue',
                0 
            );

            await downloadS3Folder(`output/${response?.element}`)

            console.log("Downloaded");

            await exec(`cd ${path.join(__dirname,`output/${response?.element}`)} && npm install && npm run build`)

            console.log("Builded");

        } catch (error) {
            console.error("error:", error);
        }
    }
}

main().catch(console.error);
