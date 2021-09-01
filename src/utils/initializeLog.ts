import log from "npmlog";

export const initializeLog = () => {
  log.addLevel("debug", 2000, { fg: "yellow" }, "debg");

  log.level = process.env.LOG_LEVEL || "info";

  log.info("", `Log level: ${log.level}`);
};
