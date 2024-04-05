import { getAppPublicKey } from "@/app/util/keys";
import { useCallback, useState } from "react";

interface Subscription {
  endpoint: string;
  auth: string; // Base64
  p256dh: string; // Base64
}

interface SubscribeState {
  subscribe: () => Promise<void>;
  subscription: Subscription | null;
}

export const useSubscribe = (registration: ServiceWorkerRegistration | null): SubscribeState => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const subscribe = useCallback(async () => {
    if (registration == null) return;

    const publicKey = getAppPublicKey();
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: publicKey,
    });

    console.debug("Subscription:", subscription);
    // https://web.dev/articles/push-notifications-web-push-protocol?hl=ja#inputs
    const auth = subscription.getKey("auth");
    const p256dh = subscription.getKey("p256dh");

    console.log("Subscription.auth:", auth);
    console.log("Subscription.p256dh:", p256dh);

    setSubscription({
      endpoint: subscription.endpoint,
      auth: Buffer.from(auth ?? new Uint8Array()).toString("base64"),
      p256dh: Buffer.from(p256dh ?? new Uint8Array()).toString("base64"),
    });
  }, [registration]);

  return { subscribe, subscription };
};
