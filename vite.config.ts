import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createHtmlPlugin } from 'vite-plugin-html';
// Element-plus自動導入
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

const env = process.cwd()

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  clearScreen: false,
  server: {
    hmr: { overlay: false }, //设置 server.hmr.overlay 为 false 可以禁用开发服务器错误的屏蔽。方便错误查看
    port: 9001, // 指定服務器端口
    open: false, // 自動開瀏覽器
    host: true,
    https: false
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.less', '.css'],
    alias: { '@': path.resolve(__dirname, './src'), }
  },
  plugins: [
    vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/, // .md  
      ],
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core', 'pinia'],
      dts: 'src/auto-imports.d.ts'
    }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
      dts: 'src/components.d.ts',
    }),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: "LCWEBS System",
        }
      }
    }),
  ],
  build: {
    assetsDir: 'static' // 静态资源的存放目录
  }
})
