import path from "path";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  datasource: {
    url: "postgresql://postgres:password@localhost:5432/tacticalstore",
  },
});