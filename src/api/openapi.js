import swaggerJsDoc from "swagger-jsdoc";

import taskSchema from "./schemas/task.js";

export const definition = {
  openapi: "3.0.0",
  info: {
    title: "Hatch-TODO",
    version: "0.0.1",
    description: "Skills Evaluation",
  },
  servers: [
    {
      url: "/api/v1",
      description: "API v1",
    },
  ],
  components: {
    schemas: {
      Task: taskSchema,
    },
  },
};

const options = {
  definition,
  apis: ["./src/api/routes/*.js"],
};

const spec = swaggerJsDoc(options);

export default spec;
