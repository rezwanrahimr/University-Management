import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, errorLogger } from './shared/logger'
import { Server } from "http";


// Handle UnCaught Exception 
process.on("uncaughtException", error => {
  errorLogger.error("UnCaught Exception is Detected...", error);
  process.exit(1);
})

let server: Server;

async function main() {
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

  // Handle UnHandled Rejection
  process.on("unhandledRejection", error => {
    errorLogger.error("UnHandle Rejection are detected,We are closing our server now ....");
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

// 
process.on("SIGTERM", () => {
  logger.info("SIGTERM is Received");
  if (server) {
    server.close();
  }
})