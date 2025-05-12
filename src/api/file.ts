import { z } from "zod";
import { ApiClient } from "../lib";
import { SendReqResponseSchema } from "../types";

export const API_PATH = "/api/file";

export const PostRequestSchema = z.object({
  host: z.string(),
  url: z.string(),
  path: z.string(),
  op: z.enum(["upload", "download"]),
});
export type PostRequest = z.infer<typeof PostRequestSchema>;
export const PostResponseSchema = SendReqResponseSchema;
export type PostResponse = z.infer<typeof PostRequestSchema>;

export async function POST(client: ApiClient, body: PostRequest) {
  return await client.useApi<typeof PostResponseSchema>(
    API_PATH,
    {
      method: "POST",
      body,
    },
    PostResponseSchema,
  );
}
