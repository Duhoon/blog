---
layout: post
published: 2023-12-17
title: What is lifecycle in nestjs?
---

# Background

Before now, I just know about lifecycle in React. I didn't know there is any lifecycle in other framework, especially in Backend framework.

Thesedays, I have used nestjs framework in my projects. If it is relatively simple projects, I can implement it by nestjs framework, but if it is advanced to implement, it is a little difficult and spend many time for me to implement it. I thought it seems to be deep insight about nestjs.

# Lifecycle Events

This is summary of nestjs from start to end. Below picture is a reference in nestjs doc.

![lifecycle events in nestjs](https://docs.nestjs.com/assets/lifecycle-events.png)

In picture, you can see the order of nestjs process running. And in each method like `onModuleInit()`, `onApplicationBootstrap(),`, you can call any function implemented in lifecycle event related in each method.

# Lifecycle Requests

Especially, I wonder about Middleware in request. There is many case which need to check auth for some request. It is conveninent to use middleware in those cases. In except of middleware, to deal with request, there are many process.

Here is summary.

Request -> Middleware -> Guards -> Interceptor -> Pipes -> Controller, Service -> Interceptor -> Response