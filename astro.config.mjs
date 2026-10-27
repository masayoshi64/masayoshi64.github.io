// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://masayoshi64.github.io",
  // Keep links to the old Hugo URLs working.
  redirects: {
    "/fixed/profile": "/profile/",
    "/fixed/works": "/works/",
    "/fixed/others": "/others/",
  },
});
