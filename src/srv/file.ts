import { z } from "zod";
import type { ApiClient } from "../lib";

export const GetFileParamsSchema = z.object({
  xxh3: z.boolean().optional(),
  md5: z.boolean().optional(),
  sha1: z.boolean().optional(),
  sha256: z.boolean().optional(),
  sha512: z.boolean().optional(),
});
export type GetFileParams = z.infer<typeof GetFileParamsSchema>;

export function getFileUrl(
  client: ApiClient,
  params: GetFileParams,
  filename: string,
): string {
  const url = new URL(`/srv/file/${filename}`, client.endpoint);
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) {
      searchParams.append(key, value.toString());
    }
  }
  url.search = searchParams.toString();
  return url.toString();
}
