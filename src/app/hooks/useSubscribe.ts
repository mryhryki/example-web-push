import { useCallback, useEffect, useState } from "react";

export interface Subscription {
  endpoint: string;
  auth: string; // Base64url
  p256dh: string; // Base64url
}

interface SubscribeState {
  subscribe: () => Promise<void>;
  subscription: Subscription | null;
}

export const useSubscribe = (registration: ServiceWorkerRegistration | null): SubscribeState => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  useEffect(() => {
    if (publicKey != null) return;
    fetch("/api/public-key")
      .then((res) => res.json())
      .then((data) => setPublicKey(data.publicKey))
      .catch(() => alert("Failed to fetch public key"));
  }, [setPublicKey]);

  const subscribe = useCallback(async () => {
    if (publicKey == null || registration == null) return;

    try {
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
    } catch (err) {
      alert("Failed to subscribe");
      console.error(err);
    }
  }, [publicKey, registration]);

  return { subscribe, subscription };
};
