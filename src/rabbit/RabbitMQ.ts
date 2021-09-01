import { Connection, Channel, connect, Options } from "amqplib";
import log from "npmlog";

export default class RabbitMQ {
  private conn!: Connection;
  private channel!: Channel;
  private queues: string[] = [];
  private rabbitStarted = false;

  constructor(
    private uri: string,
    private initialQueues?: {
      queue: string;
      options?: Options.AssertQueue;
    }[],
    private initialConsumers?: {
      queue: string;
      callback: (message: any) => Promise<void>;
      noAutoAck?: boolean;
    }[]
  ) {}

  start = async () => {
    try {
      this.conn = await connect(this.uri);
    } catch (e) {
      log.error(
        "[Broker]",
        `There was an error connecting with Rabbit. URI:${this.uri}.`
      );
      return false;
    }
    try {
      this.channel = await this.conn.createChannel();
    } catch (e) {
      log.error(
        "[Broker]",
        `There was an error creating the channel in Rabbit. URI:${this.uri}.`
      );
      return false;
    }
    this.rabbitStarted = true;
    await this.initializeQueues();
    await this.initializeConsumers();
    log.info(
      "[Broker]",
      `RabbitMQ listening for queues: ${JSON.stringify(this.queues)}`
    );
    return true;
  };

  addQueue = async (queue: string, options: Options.AssertQueue) => {
    this.checkIfRabbitStarted();
    if (this.queues.includes(queue)) {
      log.warn("[Broker]", `The queue: ${queue} is already been asserted.`);
      return true;
    }
    try {
      await this.channel.assertQueue(queue, options);
      this.queues.push(queue);
      return true;
    } catch (e) {
      log.error("[Broker]", `There was an error asserting the queue ${queue}.`);
      return false;
    }
  };

  private initializeQueues = async () => {
    if (!this.initialQueues) return;
    for (let { queue, options = {} } of this.initialQueues) {
      await this.addQueue(queue, options);
    }
  };

  addConsumer = async (
    queue: string,
    callback: (message: any) => Promise<void>,
    noAutoAck = true
  ) => {
    this.checkIfRabbitStarted();
    let completedCallback = callback;
    if (!noAutoAck) {
      completedCallback = async (msg: any) => {
        await callback(msg);
        this.channel.ack(msg);
      };
    }
    try {
      await this.channel.consume(queue, completedCallback);
      return true;
    } catch (e) {
      log.error(
        "[Broker]",
        `There was an error adding a consumer to the queue ${queue}.`
      );
      return false;
    }
  };

  private initializeConsumers = async () => {
    if (!this.initialConsumers) return;
    for (let { queue, callback, noAutoAck } of this.initialConsumers) {
      this.addConsumer(queue, callback, noAutoAck);
    }
  };

  private checkIfRabbitStarted = () => {
    if (this.rabbitStarted) return true;
    throw new Error("This Rabbit instance has not started.");
  };

  sendToQueue = (queue: string, message: any) => {
    this.checkIfRabbitStarted();
    const stringifyedMsg = JSON.stringify(message);
    return this.channel.sendToQueue(queue, Buffer.from(stringifyedMsg));
  };
}
