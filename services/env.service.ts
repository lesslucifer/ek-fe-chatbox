import { Hera } from "../utils/hera";

export interface IAppEnvironment {
    API_URL: string;
    API_TIMEOUT: number;
}

export const ENV = (): IAppEnvironment => {
    return {
        API_URL: global.window.__RUNTIME_CONFIG__.API_URL,
        API_TIMEOUT: Hera.parseInt(global.window.__RUNTIME_CONFIG__.API_TIMEOUT, undefined, 5000)
    }
}