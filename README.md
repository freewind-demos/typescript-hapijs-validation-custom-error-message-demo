TypeScript HapiJS Validate With Custom Error Message Demo
=========================================================

本来以为这是一件极为容易的事情，没想到相当复杂。

HapiJS以安全为由，在默认情况下，对于提交的参数错误，它只提示一个简单的信息：

```
{
    "error": "Bad Request",
    "message": "Invalid request payload input",
    "statusCode": 400
}
```

为了让它能够正确显示自定义的错误信息，我们需要：

1. `options` -> `validate`里面，`Joi`最后通过`.error('my-custom-error-message')`
2. `options` -> `validate`中，增加一个`failAction`方法，其中的`err`参数就是验证错误，我们拿到它以后，可以把它`throw`或`return`。但是
3. 如果需要自定义错误信息，可以使用`Boom`相关方法。如果返回一个string或者调用`h.response()`，就会报错，`Error: Lifecycle methods called before the handler can only return an error, a takeover response, or a continue signal`

总之这个过程挺麻烦的。

详细讨论在这里：<https://github.com/hapijs/hapi/issues/3706>

另外，我发现没有办法做到只让它返回一个简单的字符串，比如`my-custom-error-message`，只能是由`Boom`提示的完整的错误信息（包括`error`, `message`, `statusCode`等）

```
npm install
npm run demo
```

```
Server running at: http://localhost:8000
```

客户端
---

正确参数：

```
$ http POST http://localhost:8000/hello name=hapijs
HTTP/1.1 200 OK
Connection: keep-alive
Date: Fri, 07 Sep 2018 12:41:02 GMT
cache-control: no-cache
content-length: 13
content-type: text/html; charset=utf-8

Hello, hapijs
```

参数不合法：

```
$ http POST http://localhost:8000/hello aa=bb
HTTP/1.1 400 Bad Request
Connection: keep-alive
Date: Mon, 10 Sep 2018 05:50:43 GMT
cache-control: no-cache
content-length: 70
content-type: application/json; charset=utf-8

{
    "error": "Bad Request",
    "message": "'name' is missing",
    "statusCode": 400
}
```

其中`'name' is missing`就是我们自定义的错误信息。

同时服务端打印：

```
------------- failAction ------------
{ Error: 'name' is missing
    at Object.<anonymous> (/Users/freewind/workspace/typescript-hapijs-validation-custom-error-message-demo/server.ts:26:53)
    at Module._compile (module.js:652:30)
    at Module.m._compile (/Users/freewind/workspace/typescript-hapijs-validation-custom-error-message-demo/node_modules/ts-node/src/index.ts:439:23)
    at Module._extensions..js (module.js:663:10)
    at Object.require.extensions.(anonymous function) [as .ts] (/Users/freewind/workspace/typescript-hapijs-validation-custom-error-message-demo/node_modules/ts-node/src/index.ts:442:12)
    at Module.load (module.js:565:32)
    at tryModuleLoad (module.js:505:12)
    at Function.Module._load (module.js:497:3)
    at Function.Module.runMain (module.js:693:10)
    at Object.<anonymous> (/Users/freewind/workspace/typescript-hapijs-validation-custom-error-message-demo/node_modules/ts-node/src/bin.ts:157:12)
  isBoom: true,
  isServer: false,
  data: null,
  output:
   { statusCode: 400,
     payload:
      { statusCode: 400,
        error: 'Bad Request',
        message: '\'name\' is missing',
        validation: [Object] },
     headers: {} },
  reformat: [Function] }
```
