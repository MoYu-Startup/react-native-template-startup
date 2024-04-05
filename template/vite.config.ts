import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from 'vite-plugin-commonjs';

const isProduction = process.env.NODE_ENV === 'production';

const extensions = [
  '.web.js',
  '.web.ts',
  '.web.jsx',
  '.web.tsx',
  '.mjs',
  '.js',
  '.mts',
  '.ts',
  '.jsx',
  '.tsx',
  '.json',
];

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: 'window',
    process: { env: {} },
    // HACK: react-native-orientation-locker中使用了web不支持的setImmediate函数，使用setTimeout代替，防止报错
    clearImmediate: 'window.clearTimeout',
    setImmediate: 'window.setTimeout',
    __DEV__: !isProduction,
    APP_VERSION: JSON.stringify(require('./package.json').version),
  },
  build: {
    // 解决node_modules中第三方库使用require语法问题
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  // drop console info https://esbuild.github.io/api/#drop
  esbuild: {
    drop: isProduction ? ['console', 'debugger'] : [],
  },
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: extensions,
      loader: {
        '.js': 'jsx',
      },
    },
  },
  plugins: [
    // 允许web项目中使用require语法，与react-native端语法保持一致
    commonjs(),
    react({
      babel: {
        plugins: [
          // react-native-web
          'react-native-web',
          // react-native-reanimated
          '@babel/plugin-proposal-export-namespace-from',
          'react-native-reanimated/plugin',
        ],
      },
    }),
  ],
  resolve: {
    extensions,
    alias: {
      // 解决AssetRegistry路径不一致问题
      'react-native/Libraries/Image/AssetRegistry': 'react-native-web/dist/modules/AssetRegistry',
      'react-native': 'react-native-web',
    },
  },
});
