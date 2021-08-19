import FastestValidator from "fastest-validator";

const optional = true,
  $$strict = true;

const validator = new FastestValidator();

const defaultSchema = validator.compile({
  id: "uuid",
  name: "string",
  author: "string",
  price: { type: "number", min: 0 },
  registerDate: "date",
  $$strict,
});

const createBook = validator.compile({
  name: "string",
  author: "string",
  price: { type: "number", min: 0 },
  $$strict,
});

const updateBook = validator.compile({
  name: { type: "string", optional },
  author: { type: "string", optional },
  price: { type: "number", min: 0, optional },
  $$strict,
});

export const bookContract = {
  default: defaultSchema,
  create: createBook,
  update: updateBook,
};
