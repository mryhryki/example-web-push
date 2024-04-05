import { Subscription } from "@/app/hooks/useSubscribe";
import { getAppPrivateKey, getAppPublicKey } from "@/app/util/keys";
import type { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";

type ResponseData = {
  message: string
}

export async function POST(
  req: NextRequest,
  res: NextApiResponse<ResponseData>,
) {
  const { endpoint, auth, p256dh } = await req.json() as Subscription;

  webpush.setVapidDetails(
    "mailto:mryhryki@gmail.com",
    getAppPublicKey(),
    getAppPrivateKey(),
  );

  console.debug("#####", JSON.stringify({
    endpoint,
    keys: {
      auth,
      p256dh,
    },
  }, null, 2));

  await webpush.sendNotification({
    endpoint,
    keys: {
      auth,
      p256dh,
    },
  }, "Your Push Payload Text");

  return NextResponse.json({
    message: "Published!",
  });
}
