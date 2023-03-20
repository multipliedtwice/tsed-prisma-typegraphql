import { Configuration, Inject } from "@tsed/di";
import { PlatformApplication } from "@tsed/common";

import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/ajv";
import "@tsed/typegraphql";
import cors from "cors";
import { config } from "./config";

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: 8083,
  httpsPort: false, // CHANGE
  componentsScan: false,
  middlewares: [
    "cookie-parser",
    "compression",
    "method-override",
    "json-parser",
    { use: "urlencoded-parser", options: { extended: true } },
  ],
  exclude: ["**/*.spec.ts"],
})
export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;

  $beforeRoutesInit() {
    this.app.use(cors());
  }
}
