import { z } from "zod";
import { ApiClient } from "../lib";

export const API_PATH = "/api/list";

export const GetResponseSchema = z.object({
  ok: z.boolean(),
  sessions: z.array(z.string()),
});
export type GetResponse = z.infer<typeof GetResponseSchema>;

export function get(client: ApiClient) {
  return client.useApi(
    API_PATH,
    {
      method: "GET",
      params: {},
    },
    GetResponseSchema,
  );
}
