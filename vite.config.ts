
// @ts-check
// @tsconfig ./tsconfig.node.json

import { defineConfig } from 'vite'
import type { CommonServerOptions } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs';
import dotenv, { type DotenvParseOutput } from 'dotenv';

export default defineConfig(mode => {
  let server: CommonServerOptions = {};
  const envFileName = '.env';
  const curEnvFileName = envFileName + '.' + mode.mode;

  const envMap:DotenvParseOutput = dotenv.parse(fs.readFileSync(curEnvFileName));
  if (mode.mode === 'development') {
    console.log(`On development, trying to load env from ${curEnvFileName}`);
    server = {
      port: envMap.VITE_port ? envMap.VITE_port : 3000,
      host: envMap.VITE_host || 'localhost',
      proxy: {
        '/api': {
          target: envMap.VITE_api_proxy_domain || 'http://localhost:8097',
        }
      }
    }
  }
  return {
    base: '/view',
    plugins: [vue()],
    server,
  }
});
