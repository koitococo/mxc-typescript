export * from "./lib";
export * from "./types";

import * as ApiAllTask from "./api/all-task";
import * as ApiExec from "./api/exec";
import * as ApiFileMap from "./api/file-map";
import * as ApiFile from "./api/file";
import * as ApiInfo from "./api/info";
import * as ApiListInfo from "./api/list-info";
import * as ApiList from "./api/list";
import * as ApiResult from "./api/result";
import * as ApiScript from "./api/script";

export const Api = {
  AllTask: ApiAllTask,
  Exec: ApiExec,
  FileMap: ApiFileMap,
  File: ApiFile,
  Info: ApiInfo,
  ListInfo: ApiListInfo,
  List: ApiList,
  Result: ApiResult,
  Script: ApiScript,
};

import * as SrvFile from "./srv/file";
import * as SrvFs from "./srv/fs";
import * as SrvUrlSub from "./srv/url-sub";

export const Srv = {
  File: SrvFile,
  Fs: SrvFs,
  UrlSub: SrvUrlSub,
};

