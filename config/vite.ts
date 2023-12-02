const Path = require('path');
const vuePlugin = require('@vitejs/plugin-vue')
const { defineConfig } = require('vite');

const pkg = require('../package.json');

import electron from 'vite-plugin-electron'

console.log('electron', electron);

/**
 * https://vitejs.dev/config
 */
const config = defineConfig({
    // root:       Path.join(__dirname, '..', 'src', 'client'),
    // publicDir:  Path.join(__dirname, '..', 'src', 'client', 'public'),
    open: false,
    build: {
        outDir: Path.join(__dirname, '..', 'build'),
        emptyOutDir: true,
    }, 
    plugins: [
        vuePlugin(),
        electron(
          [
            {
              // Main-Process entry file of the Electron App.
              entry: Path.join(__dirname, '..', 'electron', 'main.ts'),
            }
          ]
        ),
      
      ],
    resolve: {
        alias: {
            '@': Path.join(__dirname, '..', 'src')
        }
    },
    base: process.env.IS_DEV !== 'true' ? './' : '/',
    server: process.env.VSCODE_DEBUG ? {
        host: pkg.debug.env.VITE_DEV_SERVER_HOSTNAME,
        port: pkg.debug.env.VITE_DEV_SERVER_PORT,
      } : undefined,
});

module.exports = config;