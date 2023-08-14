import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig(({command, mode, ssrBuild}) => {
  if (mode == "production") {
    return {
      base: './'
    };
  }

  return { plugins: [eslint()] };
});