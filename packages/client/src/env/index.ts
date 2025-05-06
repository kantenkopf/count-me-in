import { ENV_DEPLOY } from "./env.deploy";
import { ENV_DEV } from "./env.dev";
import { ENV_PROD } from "./env.prod";
import { EnvConfig } from "@/types/env.types";

const ENV: EnvConfig =
  process.env.NODE_ENV === "production"
    ? ENV_PROD
    : process.env.NODE_ENV === "development"
    ? ENV_DEV
    : ENV_DEPLOY;

export default ENV;
