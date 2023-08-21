export default {
  type: "object",
  properties: {
    id: { type: "integer" },
    status: { type: "string" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
    description: { type: "string" },
  },
  required: ["status", "description"],
  additionalProperties: false,
};
