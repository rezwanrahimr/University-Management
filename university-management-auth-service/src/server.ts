import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, errorLogger } from './shared/logger'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(
      'University Management Auth Service Database Connect Successfully',
    )
    app.listen(config.port, () => {
      logger.info(
        `University Management Auth Service listening on port ${config.port}`,
      )
    })
  } catch (error) {
    errorLogger.error('Database Connect Fail', error)
  }
}

main()
