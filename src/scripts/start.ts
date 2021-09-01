require("dotenv").config();
import { initializeBroker } from "../rabbit";
import getDb from "../database";
import { initializeDB } from "../database/iniciarDatabase";
import { initializeLog } from "../utils/initializeLog";
import { main } from "../index";
import log from "npmlog";

initializeLog();
initializeDB(getDb);
if (Number(process.env.ENABLE_BROKER)) initializeBroker();
else log.info("[Broker]", "Broker not initialized");

main();
