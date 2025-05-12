import { z } from "zod";
import { ApiClient } from "../lib";

export const API_BASE = "/srv/url-sub";

export const GetUrlByHostParamsSchema = z.object({
  host: z.string(),
  path: z.string().optional(),
  https: z.boolean().optional(),
});
export type GetUrlByHostParams = z.infer<typeof GetUrlByHostParamsSchema>;

export const GetUrlByIpParamsSchema = z.object({
  ip: z.string(),
  path: z.string().optional(),
  https: z.boolean().optional(),
});
export type GetUrlByIpParams = z.infer<typeof GetUrlByIpParamsSchema>;

export const GetIpByHostParamsSchema = z.object({
  host: z.string(),
});
export type GetIpByHostParams = z.infer<typeof GetIpByHostParamsSchema>;

export const GetUrlResponseSchema = z
  .object({
    ok: z.literal(true),
    url: z.array(z.string()),
  })
  .or(
    z.object({
      ok: z.literal(false),
      error: z.string(),
    }),
  );
export type GetUrlResponse = z.infer<typeof GetUrlResponseSchema>;

export async function GetUrlByHost(
  client: ApiClient,
  params: GetUrlByHostParams,
) {
  return await client.useApi(
    "/srv/url-sub/by-host",
    {
      method: "GET",
      params,
    },
    GetUrlResponseSchema,
  );
}

export async function GetUrlByHostIp(
  client: ApiClient,
  params: GetUrlByHostParams,
) {
  return await client.useApi(
    "/srv/url-sub/by-host-ip",
    {
      method: "GET",
      params,
    },
    GetUrlResponseSchema,
  );
}

export async function GetUrlByIp(client: ApiClient, params: GetUrlByIpParams) {
  return await client.useApi(
    "/srv/url-sub/by-ip",
    {
      method: "GET",
      params,
    },
    GetUrlResponseSchema,
  );
}

export async function GetRemoteIpByHostIp(
  client: ApiClient,
  params: GetIpByHostParams,
) {
  return await client.useApi(
    "/srv/url-sub/remote-ip-by-host-ip",
    {
      method: "GET",
      params,
    },
    GetUrlResponseSchema,
  );
}
