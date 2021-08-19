require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import { routes } from "./routes";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

routes.forEach((route) => {
  const { path, method, handleRoute } = route;
  app[method](path, handleRoute);
});

app.get("/", (req: express.Request, res: express.Response) =>
  res.send("Express + TypeScript Server")
);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Servidor ouvindo em https://localhost:${PORT}`);
});
