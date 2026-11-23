export type JsonObject = Record<string, unknown>;

export const readJsonObject = async (request: Request): Promise<JsonObject> => {
  const body: unknown = await request.json().catch(() => null);
  return body && typeof body === "object" ? (body as JsonObject) : {};
};

export const isBotSubmission = (body: JsonObject): boolean => typeof body.website === "string" && body.website !== "";
