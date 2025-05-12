import { z } from "zod";
import type { ApiClient } from "../lib";

export const GetLsdirParamsSchema = z.object({
  path: z.string(),
});
export type GetLsdirParams = z.infer<typeof GetLsdirParamsSchema>;

export const GetLsdirResponseSchema = z
  .object({
    ok: z.literal(true),
    result: z.object({}),
  })
  .or(
    z.object({
      ok: z.literal(false),
      error: z.string(),
    }),
  )
  .and(
    z.object({
      existed: z.boolean(),
    }),
  );
export type GetLsdirResponse = z.infer<typeof GetLsdirResponseSchema>;

export async function Lsdir(client: ApiClient, params: GetLsdirParams) {
  return await client.useApi(
    "/srv/fs/lsdir",
    {
      method: "GET",
      params,
    },
    GetLsdirResponseSchema,
  );
}

export const GetReadParamsSchema = z.object({
  path: z.string(),
  max_size: z.number().optional(),
});
export type GetReadParams = z.infer<typeof GetReadParamsSchema>;

export function getReadUrl(client: ApiClient, params: GetReadParams) {
  const url = new URL("/srv/fs/read", client.endpoint);
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) {
      searchParams.append(key, value.toString());
    }
  }
  url.search = searchParams.toString();
  return url.toString();
}
