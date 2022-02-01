import mongoose from 'mongoose';
import config from 'config';
import logger from './logger';

async function connect(): Promise<void> {
    const dbUri = config.get<string>("dbUri");
    try {
        await mongoose.connect(dbUri, {
            serverSelectionTimeoutMS: 3000,
        });
        logger.info("Db connected");
    } catch (error) {
        logger.error("Could not connect to Db");
        logger.error(error);
        process.exit(1);
    }
}

export default connect