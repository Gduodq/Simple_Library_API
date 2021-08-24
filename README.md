# Simple_Library_API

A CRUD API to manage books.

This API is built with [TypeScript](https://www.typescriptlang.org), [Express](https://expressjs.com), [MongoDB](www.mongodb.com/) and have built in validation with [fastest-validator](https://www.npmjs.com/package/fastest-validator).

## Getting started

This API have persistent database. To use it it's necessary to have [MongoDB](www.mongodb.com/) installed in your development enviroment. To configure the access check the [Enviroment Variables](#EnviromentVariables) section.

To run it, make sure to install all dependencies first:

### `npm install`

After the installation you can run it with:

### `npm start`

The API will listen by default on [http://localhost:8000](http://localhost:8000). To change the default port check the [Enviroment Variables](#EnviromentVariables) section.

## <a name="EnviromentVariables"></a>Enviroment Variables

- PORT:

  Set the port where the application should run.

  Default = 8000

- MONGO_HOST:

  Set the host where MongoDB instance should be running.

  Default = localhost

- MONGO_PORT:

  Set the port where MongoDB instance should be running.

  Default = 27017

- MONGO_USERNAME:

  Set the username for MongoDB authetication.

  Default = `null`

- MONGO_PASSWORD:

  Set the password for MongoDB authetication.

  Default = `null`
