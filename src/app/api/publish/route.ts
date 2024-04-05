import { getAppPrivateKey, getAppPublicKey } from "@/app/util/keys";
import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:mryhryki@gmail.com",
  getAppPublicKey(),
  getAppPrivateKey(),
);

export async function POST(req: NextRequest) {
  const { title, body, endpoint, auth, p256dh } = await req.json();

  const message = {
    title: title ?? "(No title provided)",
    body: body ?? "(No body provided)",
  };

  await webpush.sendNotification({
    endpoint,
    keys: {
      auth,
      p256dh,
    },
  }, JSON.stringify(message));

  return NextResponse.json({ message });
}
