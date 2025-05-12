import { z } from "zod";
import { ErrorCodeSchema, AgentResponseSchema } from "../types";
import { ApiClient } from "../lib";

export const API_PATH = "/api/result";

export const GetParamsSchema = z.object({
  host: z.string(),
  task_id: z.number(),
});
export type GetParams = z.infer<typeof GetParamsSchema>;
export const GetResponseSchema = z
  .object({
    ok: z.literal(true),
    payload: AgentResponseSchema,
  })
  .or(
    z.object({
      ok: z.literal(false),
      reason: ErrorCodeSchema,
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
