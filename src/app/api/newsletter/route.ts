import { NextResponse } from "next/server";
import { isBotSubmission, readJsonObject } from "@/domain/forms/body";
import type { Subscription } from "@/domain/newsletter/subscription";
import { validateSubscription } from "@/domain/newsletter/subscription";

const MAILERLITE_SUBSCRIBERS = "https://connect.mailerlite.com/api/subscribers";

const groupsFor = ({ interest }: Subscription): string[] => {
  const group = process.env[`MAILERLITE_GROUP_${interest.toUpperCase()}`] ?? process.env.MAILERLITE_GROUP_ID;
  return group ? [group] : [];
};

const fieldsFor = ({ name }: Subscription): Record<string, string> => (name ? { name } : {});

const unconfigured = () =>
  process.env.NODE_ENV === "production" ? NextResponse.json({ status: "unconfigured" }, { status: 501 }) : NextResponse.json({ status: "simulated" }, { status: 202 });

const subscribe = async (apiKey: string, subscription: Subscription): Promise<boolean> => {
  const response = await fetch(MAILERLITE_SUBSCRIBERS, {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({ email: subscription.email, fields: fieldsFor(subscription), groups: groupsFor(subscription) }),
  }).catch(() => null);
  return response?.ok ?? false;
};

export const POST = async (request: Request) => {
  const body = await readJsonObject(request);
  if (isBotSubmission(body)) return NextResponse.json({ status: "subscribed" });

  const result = validateSubscription(body);
  if (!result.ok) return NextResponse.json({ status: "invalid", error: result.error }, { status: 422 });

  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) return unconfigured();

  const subscribed = await subscribe(apiKey, result.subscription);
  return subscribed ? NextResponse.json({ status: "subscribed" }) : NextResponse.json({ status: "failed" }, { status: 502 });
};
