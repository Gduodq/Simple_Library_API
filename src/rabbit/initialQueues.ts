const durable = true;

export const initialQueues = [
  {
    queue: "req_payment",
    options: { durable },
  },
];
