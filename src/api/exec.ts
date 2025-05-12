import { z } from "zod";
import { ApiClient } from "../lib";
import { SendReqResponseSchema } from "../types";

export const API_PATH = "/api/exec";

export const PostRequestSchema = z.object({
  host: z.string(),
  cmd: z.string(),
  args: z.array(z.string()).optional(),
  use_script: z.boolean().optional(),
  use_shell: z.boolean().optional(),
});
export type PostRequest = z.infer<typeof PostRequestSchema>;
export const PostResponseSchema = SendReqResponseSchema;
export type PostResponse = z.infer<typeof PostRequestSchema>;

export async function POST(client: ApiClient, body: PostRequest) {
  return await client.useApi(
    API_PATH,
    {
      method: "POST",
      body,
    },
    PostResponseSchema,
  );
}
