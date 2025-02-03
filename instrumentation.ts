import { registerOTel } from "@vercel/otel";
import { LangfuseExporter } from "langfuse-vercel";

export function register() {
  registerOTel({
    serviceName: "AreYouSmartEnough",
    traceExporter: new LangfuseExporter(),
  });
}
