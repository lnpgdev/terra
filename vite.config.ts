import { existsSync, readdirSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Discovers component entry points by scanning src/components for any
 * subdirectory that contains an index.ts file. This means adding a new
 * component automatically includes it in the build without any config changes.
 */
function getEntries(): Record<string, string> {
  const entries: Record<string, string> = {
    index: resolve(__dirname, 'src/index.ts'),
  };

  const componentsDir = resolve(__dirname, 'src/components');

  if (existsSync(componentsDir)) {
    readdirSync(componentsDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .filter((name) => existsSync(join(componentsDir, name, 'index.ts')))
      .forEach((name) => {
        entries[`components/${name}/index`] = resolve(componentsDir, name, 'index.ts');
      });
  }

  return entries;
}

export default defineConfig({
  build: {
    lib: {
      entry: getEntries(),
      name: 'Terra',
      formats: ['es', 'cjs'],
      fileName: (format, entryAlias) => `${entryAlias}.${format}.js`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
});
