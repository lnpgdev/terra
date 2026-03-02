import { compile } from 'sass';
import { resolve } from 'path';

/**
 * Compile a SCSS file to a CSS string.
 * @param relPath - Path relative to the project root.
 */
export function compileSass(relPath: string): string {
  const result = compile(resolve(relPath), {
    loadPaths: [resolve('node_modules'), resolve('src')],
    style: 'expanded',
  });
  return result.css;
}
