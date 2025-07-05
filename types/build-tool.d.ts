import 'dotenv';

declare module 'dotenv' {
  export interface DotenvParseOutput {
    VITE_db_username: string;
    VITE_host: string;
    VITE_port: number;
    VITE_base: string;
    VITE_api_proxy_domain: string;
  }
}
