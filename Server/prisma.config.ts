import path from 'node:path';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  earlyAccess: true,
  schema: path.join('src', 'core', 'prisma', 'schema.prisma'),
});
