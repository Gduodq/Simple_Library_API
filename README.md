# Simple_Library_API

An API to manage a library.

This API is built with [TypeScript](https://www.typescriptlang.org), [Express](https://expressjs.com), [RabbitMQ](https://www.rabbitmq.com), [MongoDB](www.mongodb.com/) and have built in validation with [fastest-validator](https://www.npmjs.com/package/fastest-validator).

## Getting started

This API have persistent database. To use it it's necessary to have [MongoDB](www.mongodb.com/) installed in your development enviroment. To configure the access check the [Enviroment Variables](#EnviromentVariables) section.

The API is built based on the microservices architecture, so, it's necessary to have [RabbitMQ](https://www.rabbitmq.com) installed in your development enviroment. (The project).To configure the access check the [Enviroment Variables](#EnviromentVariables) section.

To run it, make sure to install all dependencies first:

### `npm install`

After the installation you can run it with:

### `npm start`

The API will listen by default on [http://localhost:8000](http://localhost:8000). To change the default port check the [Enviroment Variables](#EnviromentVariables) section.

## Microservices

The [Payment_Microservice](https://github.com/Gduodq/Payment_Microservice) is been built and for now will log every message that reaches the `req_payment` queue on [RabbitMQ](https://www.rabbitmq.com). To test it you can check it's repository https://github.com/Gduodq/Payment_Microservice.

The `/purchase` endpoint can trigger a message. With the method `POST` and the message body below, the endpoint must send a message to the queue and the [Payment_Microservice](https://github.com/Gduodq/Payment_Microservice) should log a message.

`[
	{
	"bookId":"d4e5f81d-d91a-49e4-a899-612699e1c546",
	"quantity":3,
	"sellerCode":""
	}
]`

## <a name="EnviromentVariables"></a>Enviroment Variables

- PORT:

  Set the port where the application should run.

  Default = 8000

- MONGO_HOST:

  Set the host where the MongoDB instance should be running.

  Default = localhost

- MONGO_PORT:

  Set the port where the MongoDB instance should be running.

  Default = 27017

- MONGO_USERNAME:

  Set the username for MongoDB authetication.

  Default = `null`

- MONGO_PASSWORD:

  Set the password for MongoDB authetication.

  Default = `null`

- BROKER_HOST:

  Set the host where the RabbitMQ instance should be running.

  Default = localhost

- BROKER_PORT:

  Set the port where the RabbitMQ instance should be running.

  Default = 5672

- BROKER_USERNAME:

  Set the username for RabbitMQ authetication.

  Default = `null`

- BROKER_PASSWORD:

  Set the password for RabbitMQ authetication.

  Default = `null`
