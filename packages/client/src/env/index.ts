import { ENV_DEV } from "./env.dev";
import { ENV_PROD } from "./env.prod";
import { EnvConfig } from "@/types/env.types";

const ENV: EnvConfig = process.env.NODE_ENV === "prod" ? ENV_PROD : ENV_DEV;

export default ENV;
