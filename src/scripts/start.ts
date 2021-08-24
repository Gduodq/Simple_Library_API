require("dotenv").config();
import { initializeBroker } from "../rabbit";
import getDb from "../database";
import { initializeDB } from "../database/iniciarDatabase";
import { main } from "../index";

initializeDB(getDb);
if (Number(process.env.ENABLE_BROKER)) initializeBroker();
else console.log("[Broker] Broker not initialized");

main();
