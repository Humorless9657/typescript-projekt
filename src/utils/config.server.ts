import * as dotenv from 'dotenv';
import type { ServerConfig } from '../server';

dotenv.config();

// exits with error 1 if there's no defined port in .env
if (!process.env.PORT) {
    process.exit(1);
};

const PORT: number = parseInt(process.env.PORT as string, 10);

type Config = {
    server: ServerConfig
};

const config: Config = {
    server: {
        port: PORT,
        corsoptions: { origin: 'localhost:' + PORT },
        limiter: {
            time: 15 * 60 * 1000,
            max: 100,
            message: "Too many requests :)"
        }
    }
};

const testConfig: Config = {
    server: {
        port: 3000,
        corsoptions: {},
        limiter: {
            time: 1000,
            max: 10,
            message: "Too many requests"
        }
    }
  };

export { config, testConfig };