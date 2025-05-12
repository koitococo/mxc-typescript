import { z } from "zod";
import { ApiClient } from "../lib";

export const API_PATH = "/api/file-map";

export const PostRequestSchema = z.object({
  maps: z.array(
    z.object({
      path: z.string(),
      name: z.string(),
      isdir: z.boolean().optional(),
    }),
  ),
});
export type PostRequest = z.infer<typeof PostRequestSchema>;
export const PostResponseSchema = z.object({
  result: z
    .array(
      z.object({
        ok: z.literal(true),
        name: z.string(),
      }),
    )
    .or(
      z.object({
        ok: z.literal(false),
        error: z.string(),
      }),
    ),
});
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

export const GetResponseSchema = z.object({
  files: z.array(z.string()),
});
export type GetResponse = z.infer<typeof GetResponseSchema>;

export async function GET(client: ApiClient, params: { path: string }) {
  return await client.useApi(
    API_PATH,
    {
      method: "GET",
      params,
    },
    GetResponseSchema,
  );
}

export const DeleteParamsSchema = z.object({
  publish_name: z.string(),
});
export type DeleteParams = z.infer<typeof DeleteParamsSchema>;

export async function DELETE(client: ApiClient, params: DeleteParams) {
  return await client.useApi(
    API_PATH,
    {
      method: "DELETE",
      params,
    },
    undefined,
  );
}
