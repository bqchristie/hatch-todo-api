import repl from "repl";

import config from "../src/utils/config.js";
import app from "../src/app.js";
import { Task } from "../src/models/init.js";
import TaskService from "../src/services/task.js";

const main = async () => {
  process.stdout.write("Database and Express app initialized.\n");
  process.stdout.write("Autoimported modules: config, app, models, services\n");

  const r = repl.start("> ");
  r.context.config = config;
  r.context.app = app;
  r.context.models = {
    Task,
  };
  r.context.services = {
    TaskService,
  };

  r.on("exit", () => {
    process.exit();
  });

  r.setupHistory(".shell_history", () => {});
};

main();
