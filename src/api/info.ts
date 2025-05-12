import { z } from "zod";
import { ExtraInfoSchema } from "../types";
import { ApiClient } from "../lib";

export const API_PATH = "/api/info";

export const GetParamsSchema = z.object({
  host: z.string(),
});
export type GetParams = z.infer<typeof GetParamsSchema>;
export const GetResponseSchema = z
  .object({
    ok: z.literal(true),
    host: z.string(),
    info: ExtraInfoSchema.nullable(),
  })
  .or(
    z.object({
      ok: z.literal(false),
    }),
  );
export type GetResponse = z.infer<typeof GetResponseSchema>;

export function GET(client: ApiClient, params: GetParams) {
  return client.useApi(
    API_PATH,
    {
      method: "GET",
      params,
    },
    GetResponseSchema,
  );
}
