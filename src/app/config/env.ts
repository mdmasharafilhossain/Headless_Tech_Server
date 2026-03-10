import dotenv from "dotenv";


dotenv.config()
interface EnvConfig {
    PORT: string,
    DB_URL: string,
    GEMINI_API_KEY: string,
    EMAIL_USER: string,
    EMAIL_PASS: string,
    CLIENT_URL: string,
    CLIENT_URL_PROD: string,
}

const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVariables: string[] = ["PORT", "DB_URL", "GEMINI_API_KEY", "EMAIL_USER", "EMAIL_PASS", "CLIENT_URL", "CLIENT_URL_PROD"];
    

    requiredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing require environment variabl ${key}`)
        }
    })

    return {
        PORT: process.env.PORT as string,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        DB_URL: process.env.DB_URL!,
        GEMINI_API_KEY: process.env.GEMINI_API_KEY as string,
        EMAIL_USER: process.env.EMAIL_USER as string,
        EMAIL_PASS: process.env.EMAIL_PASS as string,
        CLIENT_URL: process.env.CLIENT_URL as string,
        CLIENT_URL_PROD: process.env.CLIENT_URL_PROD as string,
    }
}

export const envVars = loadEnvVariables()