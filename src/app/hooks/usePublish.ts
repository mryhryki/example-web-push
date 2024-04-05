import { Subscription } from "@/app/hooks/useSubscribe";
import { useCallback } from "react";

interface PublishState {
  publish: (title: string, body: string) => Promise<void>;
}

export const usePublish = (subscription: Subscription | null): PublishState => {
  const publish = useCallback(async (title: string, body: string) => {
    if (subscription == null) return;

    await fetch("/api/publish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...subscription, title, body }),
    }).catch((err) => {
      alert("Failed to publish");
      console.error(err);
    });
  }, [subscription]);

  return { publish };
};
