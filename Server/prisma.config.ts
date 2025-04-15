import path from 'node:path';
import { defineConfig } from 'prisma/config';
import { config as loadEnv } from 'dotenv';
loadEnv();

export default defineConfig({
  earlyAccess: true,
  schema: path.join('src', 'prisma', 'schema.prisma'),
});
