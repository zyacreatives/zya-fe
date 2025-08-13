import ky, { type Options } from "ky";

export type AuthResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    image: string | null;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
  };
  message?: string;
};

type JSendResponse<T> = {
  status: "success" | "fail" | "error";
  data: T;
  message?: string;
};

export class APIError extends Error {
  constructor(
    message: string,
    public readonly status: number = 500,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = "APIError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, APIError);
    }
  }
}

type ErrorBody = {
  message?: string;
  [key: string]: unknown;
};

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const baseClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  hooks: {
    afterResponse: [
      async (_, __, response) => {
        if (!response.ok) {
          const errorBody = (await response
            .clone()
            .json()
            .catch(() => ({}))) as ErrorBody;
          const message =
            errorBody.message ||
            `HTTP ${response.status}: ${response.statusText}`;
          throw new APIError(message, response.status, errorBody);
        }
      },
    ],
  },
});

class APIClient {
  private client = baseClient;

  get = this.client.get.bind(this.client);
  post = this.client.post.bind(this.client);
  put = this.client.put.bind(this.client);
  patch = this.client.patch.bind(this.client);
  delete = this.client.delete.bind(this.client);

  private getMethod(method: HttpMethod) {
    const methods = {
      GET: this.client.get,
      POST: this.client.post,
      PUT: this.client.put,
      PATCH: this.client.patch,
      DELETE: this.client.delete,
    };
    return methods[method];
  }

  async jsend<T>(
    url: string,
    method: HttpMethod = "POST",
    options?: Options
  ): Promise<T> {
    const methodFn = this.getMethod(method);
    const response = await methodFn(url, options);
    const json = await response.json<JSendResponse<T>>();

    if (json.status !== "success") {
      throw new APIError(json.message ?? "JSend request failed", 400, json);
    }

    return json.data;
  }

  async auth<T = AuthResponse>(
    url: string,
    method: HttpMethod = "POST",
    options?: Options
  ): Promise<T> {
    const methodFn = this.getMethod(method);
    const response = await methodFn(url, options);

    if (!response.ok) {
      const errorBody = (await response.json().catch(() => ({}))) as ErrorBody;
      throw new APIError(
        errorBody.message ?? "Authentication failed",
        response.status,
        errorBody
      );
    }

    return response.json<T>();
  }

  async request<T>(url: string, options?: Options): Promise<T> {
    const response = await this.client(url, options);
    return response.json<T>();
  }
}

export const api = new APIClient();
