import { ENV } from "./env.service";
import axios, { AxiosError } from "axios";
import Auth from "./auth.service";
import _ from "lodash";

export class AppLogicError extends Error {
    url?: string;
    code?: string;
    params?: any;
    data?: any;

    constructor(err?: object, url?: string, data?: any) {
        super(_.get(err, 'message'))
        this.code = _.get(err, 'message')
        this.params = _.get(err, 'params')
        this.url = url
        this.data = data
    }
}

// create an axios instance
const Http = axios.create({
    baseURL: ENV().API_URL, // url = base url + request url
    timeout: ENV().API_TIMEOUT, // request timeout
});

// request interceptor
Http.interceptors.request.use((config) => {
    // do something before request is sent
    config.headers['Accept'] = config.headers['Accept'] || 'application/json'
    config.headers['Content-Type'] = config.headers['Content-Type'] ?? 'application/json'
    if (Auth.AccessToken) {
        config.headers["Authorization"] = Auth.AccessToken;
    }
    return config;
}, (error) => {
    // do something with request error
    console.debug(error); // for debug
    return Promise.reject(error);
});

// response interceptor
Http.interceptors.response.use((response) => {
    const json = response?.data;
    if (json?.success === false) {
        throw new AppLogicError(json?.err, response.config.url, json?.data);
    }
    return json?.data
}, async (error: AxiosError) => {
    try {
        if (Auth.isAxiosAuthError(error)) {
            await Auth.refreshAccessToken();
            return await Http.request(error.config)
        }
    }
    catch (err) {
        console.debug(error); // for debug
        return Promise.reject(err)
    }

    console.debug(error); // for debug
    return Promise.reject(error);
});

export default Http;