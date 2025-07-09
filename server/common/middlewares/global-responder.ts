import Koa from 'koa';

enum Code {
  ok = 200,
  fail = 500,
}

function responder(data: any = null, message: string = '', code: Code) {
  return {
    code,
    data,
    message,
  };
}

function ok(data: any = null, message: string = 'ok') {
  return responder(data, message, Code.ok);
}

function fail(message: string = 'Server Fail') {
  return responder(null, message, Code.fail);
}

export default async function (ctx: Koa.Context, next: Koa.Next) {
  ctx.ok = ok;
  ctx.fail = fail;
  await next();
}
