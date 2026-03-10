import { cpSync, existsSync, readdirSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

import { defineConfig, type Plugin } from 'vite';

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
    entries['components/index'] = resolve(componentsDir, 'index.ts');

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

/**
 * Copies font assets from @lnpg/sol into Terra's dist so that the relative
 * paths emitted by terra.css (e.g. ../assets/fonts/montserrat/...) resolve
 * correctly when consumers serve the package.
 */
function copyFonts(): Plugin {
  return {
    name: 'terra-copy-fonts',
    closeBundle() {
      const src = resolve(__dirname, 'node_modules/@lnpg/sol/dist/assets/fonts');
      const dest = resolve(__dirname, 'dist/assets/fonts');

      if (!existsSync(src)) {
        console.warn('[terra-copy-fonts] Sol font directory not found:', src);
        return;
      }

      cpSync(src, dest, { recursive: true });
      console.log('[terra-copy-fonts] Copied fonts from Sol →', dest);
    },
  };
}

export default defineConfig({
  plugins: [copyFonts()],
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
        // Bootstrap 5 uses deprecated Sass APIs internally. These warnings are
        // not actionable by us and will be resolved when Bootstrap upgrades to
        // Sass-modern-compatible syntax in a future major release.
        silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function'],
      },
    },
  },
});
