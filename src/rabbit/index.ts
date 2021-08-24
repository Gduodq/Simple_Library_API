import amqp from "amqplib/callback_api";

export const initializeBroker = () => {
  amqp.connect(
    "amqp://guest:guest@localhost:5672",
    function (errConn, connection: amqp.Connection) {
      if (errConn) throw errConn;
      connection.createChannel(function (errChan, channel: amqp.Channel) {
        if (errChan) throw errChan;
        const queue = "req_payment";
        channel.assertQueue(queue, { durable: false });
        console.log(`[Broker] Server sending on queue: ${queue}`);
      });
    }
  );
};
