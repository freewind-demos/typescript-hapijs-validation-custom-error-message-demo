TypeScript HapiJS Validate Payload(Request Body) Demo
=====================================================

在HapiJS中，对于客户端发送过来的Request Body，可以通过`request.payload`得到。

如何对其中的值进行验证？进行返回正确的http code?

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

参数太长：

```
$ http POST http://localhost:8000/hello name=hapijs-toooooooooo-long
HTTP/1.1 400 Bad Request
Connection: keep-alive
Date: Fri, 07 Sep 2018 12:41:54 GMT
cache-control: no-cache
content-length: 82
content-type: application/json; charset=utf-8

{
    "error": "Bad Request",
    "message": "Invalid request payload input",
    "statusCode": 400
}
```

有一个参数不存在(`another`)：

```
$ http POST http://localhost:8000/hello name=hapijs another=some
HTTP/1.1 400 Bad Request
Connection: keep-alive
Date: Fri, 07 Sep 2018 12:43:13 GMT
cache-control: no-cache
content-length: 82
content-type: application/json; charset=utf-8

{
    "error": "Bad Request",
    "message": "Invalid request payload input",
    "statusCode": 400
}
```