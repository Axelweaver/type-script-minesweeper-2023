import { defineConfig } from 'vite';

export default defineConfig(({command, mode, ssrBuild}) => {
  if (mode == "production") {
    return {
      base: './'
    };
  }

  return { };
});