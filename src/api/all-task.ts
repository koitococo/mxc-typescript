import { z } from "zod";
import { ApiClient } from "../lib";

export const API_PATH = "/api/all-task";

export const GetParamsSchema = z.object({
  host: z.string(),
});
export type GetParams = z.infer<typeof GetParamsSchema>;
export const GetResponseSchema = z.array(z.number());
export type GetResponse = z.infer<typeof GetResponseSchema>;

export async function GET(client: ApiClient, params: GetParams) {
  return await client.useApi(
    API_PATH,
    {
      method: "GET",
      params,
    },
    GetResponseSchema,
  );
}
