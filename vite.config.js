import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({command, mode, ssrBuild}) => {
  if (mode == "production") {
    return {
      base: './',
      plugins: [tsconfigPaths()]
    };
  }

  return { plugins: [eslint(), tsconfigPaths()] };
});