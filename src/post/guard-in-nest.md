---
layout: post
published: 2024-02-01
title: What is the Guards in Nest?
---

I had developed auth on a project this time. And I use Nest for server framewrok.
Nest has a lot of function for developing web server.
And for auth, they provide Guards. This post tells about those guards.

# ArgumentsHost Class

This class provided by Nest help get arguments from Handler.  ArgumentsHost acts as an abstraction over a handlers' arguments.
ArgumentsHost usually is provided, referenced as a `host` parameter.

`host` have method, `getType()`, to get across multiple application contexts. So you can implements logic fitted in each contexts.

It seems like to provide specific object for each context from ArgumentHost, for example RpcArgumentsHost, HttpArgumentsHost, and WsArgumentsHost.

# Execution Context

> Nest provides several utility classes that help make it easy to write applications that function `across multiple application contexts` (e.g., Nest HTTP server-based, microservices and WebSockets application contexts). These utilities provide information about the current execution context which can be used to build generic guards, filters, and interceptors that can work across a broad set of controllers, methods, and execution contexts.

Above these words, Next Doc tell about `Execution Context`. I highlighted 'Across Multiple Application Contexts'. 

`Execution Contexts` extends `Arguments Host` 

```javascript
export interface ExecutionContext extends ArgumentsHost {
  /**
   * Returns the type of the controller class which the current handler belongs to.
   */
  getClass<T>(): Type<T>;
  /**
   * Returns a reference to the handler (method) that will be invoked next in the
   * request pipeline.
   */
  getHandler(): Function;
}
```

Nest Doc says, 'The `getHandler()` method returns a reference to the handler about to be invoked.' Nest Doc also says, '`getClass()` method returns the type of `Controller` class which this particular handler belongs to'. In my understand, `getHandler()` method is usefull to check which function is called by this request, and `getClass()` method is usefull to check which controller context belong this request.

# Guard
In Nest, Guard is an injectable class implementing CanActivate interface. CanActivate interface has `canActivate()` method. The interesting point is that `canActivate()` method has parameter of `Execution Context` by named `host`.

```javascript
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppController } from './app.controller';

@Injectable()
export class AppGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(context.getClass() === AppController);
    console.log(context.getHandler());
    return true;
  }
}
```

Above this sentence, you can see simple example about Guard. As seen from the above, Guard must implements `canActivate()` method for you to access `Execution Context`. Before deal with handlers job, you can implements authorization logic for appropriate user having privilege to routing handler.


