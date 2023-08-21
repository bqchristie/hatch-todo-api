export default {
  type: "object",
  properties: {
    id: { type: "integer" },
    status: { type: "string" },
    createdAt: { type: "string", format: "date-time", nullable: true },
    updatedAt: { type: "string", format: "date-time", nullable: true },
    description: { type: "string" },
  },
  required: ["status", "description"],
  additionalProperties: false,
};
