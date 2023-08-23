# Hatch-TODO

Most of my comments for the complete application are sitting in corresponding repository for the client application.
[HERE](https://github.com/bqchristie/hatch-todo-client)



* I will call out that I started this project from the [API bakery.](https://apibakery.com/)  
* The bakery gives a very good baseline set a code for implementing best practices.
* Not saying that I wouldn't to get to these things on my own but this is a very convenient way of getting a project off to a good start.

[API and DOCS are here](http://172.105.110.150:3000/api/docs/)

You can also get them locally by running the app.

**NOTE:  The DB is SQL Lite and for simplicity travels with the repo. I would obviously modify for production.**







## Quickstart

1. Install required packages:

   ```
   npm install
   ```

2. Copy `env.sample` to `.env` and edit it with your settings.
   At least `DATABASE_URL` must be specified.

3. Create initial database migration:

   ```
   npx prisma migrate dev --name initial
   ```

   When run the first time, it will also install
   `@prisma/client` and generate client code.

4. Run the tests:

   ```
   npm run test
   ```

## Development

To run the server in development mode, with log pretty-printing
and hot-reload:

```
npm run devstart
```

To run the tests, run the `test` script (`npm run test`). There are
also related `coverage` (run tests and measure test coverage) and `lint`
(run linter) scripts you can use. ESLint is used for linting and its
configuration is specified in `.eslintrc.json`.

The code can be automatically using `prettier`. To manually run
prettier, use `npm run prettier`. Better yet, integrate your editor
to run it on save.

### Development shell

Development shell runs nodejs shell with the application object (`app`),
database models (`models`) and the configuration object (`config`)
already imported. To run the shell:

```
npm run shell
```

The shell supports toplevel async/await (ie. you can use async/await
directly in the shell if needed).

### OpenAPI and Swagger docs

The project includes an OpenAPI spec and a Swagger UI for documentation and
interaction with API.

The Swagger UI is available at `/api/docs` path (`/` is redirected to it by
default) and the spec itself is available at `/api/docs/openapi.json`.

## Production

To run the app in production, run:

```
npm start
```

Logs will be sent to the standard output in JSON format.

## Background tasks with Bull

A simple task queue is built using `bull` and backed by Redis. Tasks are
defined and exported in `src/tasks.js`. Call proxies are created automatically
and tasks can be queued with:

```
import { tasks } from "./src/utils/queue.js";
const result = await tasks.someFunction(...);
```

To run the worker(s) that will execute the queued tasks, run:

```
npm run worker
```
