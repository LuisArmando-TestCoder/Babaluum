import { NextResponse } from "next/server";
import { validateContact } from "@/domain/contact/message";
import { isBotSubmission, readJsonObject } from "@/domain/forms/body";

const forward = async (webhook: string, payload: object): Promise<boolean> => {
  const response = await fetch(webhook, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => null);
  return response?.ok ?? false;
};

export const POST = async (request: Request) => {
  const body = await readJsonObject(request);
  if (isBotSubmission(body)) return NextResponse.json({ status: "sent" });

  const result = validateContact(body);
  if (!result.ok) return NextResponse.json({ status: "invalid", errors: result.errors }, { status: 422 });

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ status: "unconfigured" }, { status: 501 });

  const delivered = await forward(webhook, { ...result.message, source: "babaluum.com/contacto" });
  return delivered ? NextResponse.json({ status: "sent" }) : NextResponse.json({ status: "failed" }, { status: 502 });
};
