import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, errorLogger } from './shared/logger'
import { Server } from "http";

async function main() {
  let server: Server;
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(
      'University Management Auth Service Database Connect Successfully',
    )
    server = app.listen(config.port, () => {
      logger.info(
        `University Management Auth Service listening on port ${config.port}`,
      )
    })
  } catch (error) {
    errorLogger.error('Database Connect Fail', error)
  }

  process.on("unhandledRejection", error => {
    console.log("UnHandle Rejection are detected,We are closing our server now ....");
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      })
    } else {
      process.exit(1);
    }
  })
}

main()
