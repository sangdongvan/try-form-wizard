import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  tools: {
    postcss: (config, { addPlugins }) => {
      addPlugins([
        /* eslint-disable */
        require('postcss-import'),
        require('postcss-nesting'),
        require('./postcss-breakpoints.cjs'),
        require('postcss-custom-media'),
        require('postcss-combine-duplicated-selectors'),
        require('postcss-discard-empty'),
        require('./postcss-whitespace.cjs'),
        require('autoprefixer'),
        /* eslint-enable */
      ]);
    },
  },
});
