import { z } from "zod";
import { ExtraInfoSchema } from "../types";
import { ApiClient } from "../lib";

export const API_PATH = "/api/list-info";

export const GetResponseSchema = z
  .object({
    ok: z.literal(true),
    hosts: z.array(
      z.object({
        host: z.string(),
        info: ExtraInfoSchema.nullable(),
      }),
    ),
  })
  .or(
    z.object({
      ok: z.literal(false),
    }),
  );
export type GetResponse = z.infer<typeof GetResponseSchema>;

export function GET(client: ApiClient) {
  return client.useApi(
    API_PATH,
    {
      method: "GET",
      params: {},
    },
    GetResponseSchema,
  );
}
