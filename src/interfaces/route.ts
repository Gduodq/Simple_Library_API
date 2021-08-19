import express from "express";
import { acceptedMethods } from "../enums/acceptedMethods";

export interface Route {
  path: string;
  method: acceptedMethods;
  handleRoute(req: express.Request, res: express.Response): void;
}
