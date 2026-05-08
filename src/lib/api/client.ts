import axios, { AxiosError } from "axios";

const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!apiBaseURL) {
    throw new Error("Missing NEXT_PUBLIC_API_BASE_URL environment variable.");
}

export const apiClient = axios.create({
    baseURL: apiBaseURL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000,
});

const getRequestURL = (baseURL?: string, url?: string) => {
    if (!url) {
        return baseURL ?? "";
    }

    if (/^https?:\/\//i.test(url)) {
        return url;
    }

    return `${baseURL?.replace(/\/$/, "") ?? ""}/${url.replace(/^\//, "")}`;
};

apiClient.interceptors.request.use(
    (config) => {
        const url = getRequestURL(config.baseURL, config.url);

        console.log("[API Request]", {
            method: config.method?.toUpperCase(),
            url,
            params: config.params,
            data: config.data,
        });

        return config;
    },
    (error: AxiosError) => {
        const url = getRequestURL(error.config?.baseURL, error.config?.url);

        console.error("[API Request Error]", {
            url,
            message: error.message,
            error,
        });

        return Promise.reject(error);
    },
);

apiClient.interceptors.response.use(
    (response) => {
        const url = getRequestURL(response.config.baseURL, response.config.url);

        console.log("[API Response]", {
            method: response.config.method?.toUpperCase(),
            url,
            status: response.status,
            data: response.data,
        });

        return response;
    },
    (error: AxiosError) => {
        const url = getRequestURL(error.config?.baseURL, error.config?.url);

        console.error("[API Response Error]", {
            method: error.config?.method?.toUpperCase(),
            url,
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
        });

        return Promise.reject(error);
    },
);
