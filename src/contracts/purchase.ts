import FastestValidator from "fastest-validator";

const $$strict = true;

const validator = new FastestValidator();

const defaultSchema = validator.compile({
  purchase: {
    type: "array",
    items: {
      type: "object",
      props: {
        bookId: "string",
        quantity: { type: "number", min: 0 },
        sellerCode: "string",
      },
    },
    $$strict,
  },
});

export const purchaseContract = {
  default: defaultSchema,
};
