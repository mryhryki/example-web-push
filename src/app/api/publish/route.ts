import { getServerPrivateKey, getServerPublicKey } from "@/app/util/keys";
import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:mryhryki@gmail.com",
  getServerPublicKey(),
  getServerPrivateKey(),
);

export async function POST(req: NextRequest) {
  const { title, body, endpoint, auth, p256dh } = await req.json();

  const message = {
    title: title.trim() || "(No title provided)",
    body: body.trim() || "(No body provided)",
  };

  await webpush.sendNotification({
    endpoint,
    keys: {
      auth,
      p256dh,
    },
    urgency: "high",
  }, JSON.stringify(message));

  return NextResponse.json({ message });
}
