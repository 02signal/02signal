import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://02signal.ai",
  integrations: [sitemap()],
  output: "static"
});
