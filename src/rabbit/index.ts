import RabbitMQ from "./RabbitMQ";
import { initialQueues } from "./initialQueues";

const rabbitUsername = process.env.BROKER_USERNAME || "";
const rabbitPassword = process.env.BROKER_PASSWORD || "";
const rabbitAuthUrl =
  rabbitUsername || rabbitPassword
    ? `${rabbitUsername}:${rabbitPassword}@`
    : "";
const rabbitHost = process.env.BROKER_HOST || "localhost";
const rabbitPort = process.env.BROKER_PORT || "5672";
const rabbitUrl = `amqp://${rabbitAuthUrl}${rabbitHost}:${rabbitPort}`;

const Broker = new RabbitMQ(rabbitUrl, initialQueues);

export const initializeBroker = async () => {
  await Broker.start();
};

export default Broker;
