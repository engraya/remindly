import path from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    env: {
      SKIP_ENV_VALIDATION: "true",
      DATABASE_URL: "postgresql://test:test@localhost:5432/test",
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_test_mock",
      CLERK_SECRET_KEY: "sk_test_mock",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
