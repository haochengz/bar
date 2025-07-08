import Koa from 'koa';

enum Code {
  ok = 200,
  fail = 500,
  notFound = 404,
  unauthorized = 401,
  forbidden = 403,
}

class Responder {
  static ok(data: any = null, message: string = 'ok') {
    return {
      code: Code.ok,
      data,
      message,
    };
  }

  static fail(message: string = 'Server Fail') {
    return {
      code: Code.fail,
      message,
    };
  }

  static notFound(message: string = 'Not Found') {
    return {
      code: Code.notFound,
      message,
    };
  }

  static unauthorized(message: string = 'Unauthorized') {
    return {
      code: Code.unauthorized,
      message,
    };
  }

  static forbidden(message: string = 'Forbidden') {
    return {
      code: Code.forbidden,
      message,
    };
  }
}

export default async function respondHandler(ctx: Koa.Context, next: Koa.Next) {
  ctx.ok = Responder.ok;
  ctx.fail = Responder.fail;
  ctx.notFound = Responder.notFound;
  ctx.unauthorized = Responder.unauthorized;
  ctx.forbidden = Responder.forbidden;

  await next();
}
