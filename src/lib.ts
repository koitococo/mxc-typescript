import type { z, ZodSchema } from "zod";

export class UnreachableError extends Error {
  constructor() {
    super("Unreachable code executed");
    this.name = "UnreachableError";
  }
}

export type BaseError = {
  type: string;
};
export type Result<TData, TError> =
  | {
      success: true;
      data: TData;
    }
  | {
      success: false;
      error: TError;
    };

export type GeneralError = {
  type: "general";
  message: string;
};

export type ValidationError = {
  type: "validation";
  message: string;
};

export type ApiError = GeneralError | ValidationError;

export type ApiResult<T, E extends BaseError = ApiError> = Promise<
  Result<T, E> & { status: number }
>;

export type ApiResultInfer<
  T extends ZodSchema,
  E extends BaseError = ApiError,
> = ApiResult<z.infer<T>, E>;

export type ImplToString = string | number | boolean;

export type ApiRequestParams<
  TRequestSchema extends ZodSchema,
  TRequest = z.infer<TRequestSchema>,
> =
  | {
      method: "POST";
      body: TRequest;
    }
  | {
      method: "GET";
      params: Record<string, ImplToString>;
    }
  | {
      method: "DELETE";
      params: Record<string, ImplToString>;
    };

export type ApiRequest<TRequestSchema extends ZodSchema> = {
  endpoint: string;
  apiKey?: string;
  apiPath: string;
} & ApiRequestParams<TRequestSchema>;

export async function useApi<TRequestSchema extends ZodSchema = any>(
  request: ApiRequest<TRequestSchema>,
): ApiResult<undefined>;
export async function useApi<
  TResponseSchema extends ZodSchema,
  TRequestSchema extends ZodSchema = any,
>(
  request: ApiRequest<TRequestSchema>,
  responseSchema?: TResponseSchema,
): ApiResult<z.infer<TResponseSchema>>;
export async function useApi<
  TResponseSchema extends ZodSchema,
  TRequestSchema extends ZodSchema = any,
>(
  request: ApiRequest<TRequestSchema>,
  responseSchema?: TResponseSchema,
): ApiResult<z.infer<TResponseSchema>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (request.apiKey) {
    headers["Authorization"] = `Bearer ${request.apiKey}`;
  }
  const options: RequestInit = {
    method: request.method,
    headers,
  };
  const url = new URL(request.apiPath, request.endpoint);
  if (request.method === "GET" || request.method === "DELETE") {
    for (const key in request.params) {
      const element = request.params[key]!;
      url.searchParams.append(key, element.toString());
    }
  } else if (request.method === "POST") {
    options.body = JSON.stringify(request.body);
  } else {
    throw new UnreachableError();
  }
  try {
    const response = await fetch(url, options);
    // We should not check for HTTP status codes here, because the "error" status does not mean that the request failed.
    if (responseSchema) {
      const data = await response.json();
      const schema = responseSchema as unknown as TResponseSchema;
      const parsed = await schema.safeParseAsync(data);
      if (parsed.success) {
        return {
          success: true,
          status: response.status,
          data: parsed.data,
        };
      }
      return {
        success: false,
        status: response.status,
        error: {
          type: "validation",
          message: parsed.error.message,
        },
      };
    }
    return {
      success: true,
      status: response.status,
      data: undefined,
    };
  } catch (error) {
    return {
      success: false,
      status: -1, // Network error
      error: { type: "general", message: (error as Error).message },
    };
  }
}

export class ApiClient {
  constructor(
    public endpoint: string,
    public apiKey?: string,
  ) {
    this.useApi = this.useApi.bind(this);
  }

  public async useApi<TRequestSchema extends ZodSchema = any>(
    apiPath: string,
    params: ApiRequestParams<TRequestSchema>,
  ): ApiResult<undefined>;
  public async useApi<
    TResponseSchema extends ZodSchema,
    TRequestSchema extends ZodSchema = any,
  >(
    apiPath: string,
    params: ApiRequestParams<TRequestSchema>,
    responseSchema?: TResponseSchema,
  ): ApiResult<z.infer<TResponseSchema>>;
  public async useApi<
    TResponseSchema extends ZodSchema,
    TRequestSchema extends ZodSchema = any,
  >(
    apiPath: string,
    params: ApiRequestParams<TRequestSchema>,
    responseSchema?: TResponseSchema,
  ): ApiResult<z.infer<TResponseSchema>> {
    return useApi(
      {
        endpoint: this.endpoint,
        apiKey: this.apiKey,
        apiPath,
        ...params,
      },
      responseSchema,
    );
  }
}
