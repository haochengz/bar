enum Code {
  ok = 200,
  fail = 500,
}

export default class Respond {
  static ok<T>(data: T, message: string = 'ok') {
    return {
      code: Code.ok,
      data,
      message,
    };
  }

  static fail(message: string = 'Server Fail') {
    return {
      code: Code.fail,
      data: null,
      message,
    };
  }
}

export const ok = Respond.ok;
export const fail = Respond.fail;
