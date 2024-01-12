import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log("University Management Auth Service Database Connect Successfully");
        app.listen(config.port, () => {
            console.log(`University Management Auth Service listening on port ${config.port}`)
        })
    } catch (error) {
        console.log("Database Connect Fail", error);
    }
}

main();