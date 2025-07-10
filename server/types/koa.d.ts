import * as Koa from 'koa';

declare module 'koa' {
  interface Context {
    ok(
      data?: any,
      message?: string,
    ): {
      code: number;
      data: any;
      message: string;
    };

    fail(message?: string): {
      code: number;
      data: null;
      message: string;
    };
  }

  interface DefaultContext {
    ok(
      data?: any,
      message?: string,
    ): {
      code: number;
      data: any;
      message: string;
    };

    fail(message?: string): {
      code: number;
      data: null;
      message: string;
    };
  }
}

declare module 'koa-router' {
  interface IRouterParamContext {
    ok(
      data?: any,
      message?: string,
    ): {
      code: number;
      data: any;
      message: string;
    };

    fail(message?: string): {
      code: number;
      data: null;
      message: string;
    };
  }
}
