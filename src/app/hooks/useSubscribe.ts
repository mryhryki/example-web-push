import { getAppPublicKey } from "@/app/util/keys";
import { useCallback, useState } from "react";
export interface Subscription {
  endpoint: string;
  auth: string; // Base64url
  p256dh: string; // Base64url
}

interface SubscribeState {
  subscribe: () => Promise<void>;
  subscription: Subscription | null;
}

export const useSubscribe = (publicKey: string,registration: ServiceWorkerRegistration | null): SubscribeState => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const subscribe = useCallback(async () => {
    if (registration == null) return;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: publicKey,
    });

    // https://web.dev/articles/push-notifications-web-push-protocol?hl=ja#inputs
    const auth = subscription.getKey("auth");
    const p256dh = subscription.getKey("p256dh");

    setSubscription({
      endpoint: subscription.endpoint,
      auth: Buffer.from(auth ?? new Uint8Array(0)).toString("base64"),
      p256dh: Buffer.from(p256dh ?? new Uint8Array(0)).toString("base64"),
    });
  }, [registration]);

  return { subscribe, subscription };
};
