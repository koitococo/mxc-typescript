import { z } from "zod";

export const SocketConnectInfoSchema = z.object({
  local_addr: z.string().optional(),
  remote_addr: z.string().optional(),
});
export type SocketConnectInfo = z.infer<typeof SocketConnectInfoSchema>;

export const CpuInfoSchema = z.object({
  names: z.array(z.string()),
  vendor_id: z.string(),
  brand: z.string(),
});
export type CpuInfo = z.infer<typeof CpuInfoSchema>;

export const MntInfoSchema = z.object({
  kind: z.string(),
  device_name: z.string(),
  file_system: z.string(),
  mount_point: z.string(),
  total_space: z.number(),
  is_removable: z.boolean(),
  is_read_only: z.boolean(),
});
export type MntInfo = z.infer<typeof MntInfoSchema>;

export const IpInfoSchema = z.object({
  ip: z.string(),
  version: z.number(),
  prefix: z.number(),
});

export const NicInfoSchema = z.object({
  mac_address: z.string(),
  mtu: z.number(),
  ip: z.array(IpInfoSchema),
});
export type NicInfo = z.infer<typeof NicInfoSchema>;

export const BlkInfoSchema = z.object({
  maj_min: z.string(),
  disk_seq: z.number(),
  name: z.string(),
  kname: z.string(),
  model: z.string().optional(),
  size: z.number(),
  removable: z.boolean(),
  uuid: z.string().optional(),
  wwid: z.string().optional(),
  readonly: z.boolean(),
  path: z.string().optional(),
  path_by_seq: z.string().optional(),
  subsystem: z.string().optional(),
});
export type BlkInfo = z.infer<typeof BlkInfoSchema>;

export const UtsInfoSchema = z.object({
  sysname: z.string(),
  nodename: z.string(),
  release: z.string(),
  version: z.string(),
  machine: z.string(),
  domainname: z.string(),
});
export type UtsInfo = z.infer<typeof UtsInfoSchema>;

export const SystemInfoSchema = z.object({
  total_mem: z.number(),
  name: z.string().optional(),
  hostname: z.string().optional(),
  kernel_version: z.string().optional(),
  cpus: z.array(CpuInfoSchema),
  mnts: z.array(MntInfoSchema),
  nics: z.array(NicInfoSchema),
  blks: z.array(BlkInfoSchema),
  uts: UtsInfoSchema.optional(),
});
export type SystemInfo = z.infer<typeof SystemInfoSchema>;

export const ExtraInfoSchema = z.object({
  socket_info: SocketConnectInfoSchema,
  controller_url: z.string().url(),
  system_info: SystemInfoSchema,
  envs: z.array(z.string()),
  session_id: z.string(),
});
export type ExtraInfo = z.infer<typeof ExtraInfoSchema>;

export const NoneResponseSchema = z.null();
export type NoneResponse = z.infer<typeof NoneResponseSchema>;

export const CommandExecutionResponseSchema = z.object({
  code: z.number(),
  stdout: z.string(),
  stderr: z.string(),
});
export type CommandExecutionResponse = z.infer<
  typeof CommandExecutionResponseSchema
>;

export const FileOperationResponseSchema = z.object({
  success: z.boolean(),
  hash: z.string().optional(),
});
export type FileOperationResponse = z.infer<typeof FileOperationResponseSchema>;

export const ScriptEvalResponseSchema = z.object({
  ok: z.boolean(),
  result: z.string(),
});
export type ScriptEvalResponse = z.infer<typeof ScriptEvalResponseSchema>;

export const ErrorResponseSchema = z.object({
  code: z.string(),
  message: z.string(),
});
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

export const AgentResponsePayloadSchema = z.union([
  NoneResponseSchema,
  CommandExecutionResponseSchema,
  FileOperationResponseSchema,
  ScriptEvalResponseSchema,
  ErrorResponseSchema,
]);
export type AgentResponsePayload = z.infer<typeof AgentResponsePayloadSchema>;

export const AgentResponseSchema = z.object({
  id: z.number(),
  ok: z.boolean(),
  payload: AgentResponsePayloadSchema,
});
export type AgentResponse = z.infer<typeof AgentResponseSchema>;

export const ERR_REASON_SESSION_NOT_FOUND: string = "SESSION_NOT_FOUND";
export const ERR_REASON_TASK_NOT_FOUND: string = "TASK_NOT_FOUND";
export const ERR_REASON_TASK_NOT_COMPLETED: string = "TASK_NOT_COMPLETED";
export const ERR_REASON_INTERNAL_ERROR: string = "INTERNAL_ERROR";
export const ErrorCodeSchema = z.enum([
  ERR_REASON_INTERNAL_ERROR,
  ERR_REASON_SESSION_NOT_FOUND,
  ERR_REASON_TASK_NOT_COMPLETED,
  ERR_REASON_TASK_NOT_FOUND,
]);
export type ErrorCode = z.infer<typeof ErrorCodeSchema>;

export const SendReqResponseSchema = z
  .object({
    ok: z.literal(true),
    task_id: z.number(),
  })
  .or(
    z.object({
      ok: z.literal(false),
      reason: ErrorCodeSchema,
    }),
  );
export type SendReqResponse = z.infer<typeof SendReqResponseSchema>;
