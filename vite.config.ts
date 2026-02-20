import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'Terra',
            formats: ['es', 'cjs'],
            fileName: (format) => `terra.${format}.js`,
        },
        rollupOptions: {
            external: ['@lnpg/sol'],
            output: {
                globals: {
                    '@lnpg/sol': 'Sol',
                },
            },
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
