import { Subscription } from "@/app/hooks/useSubscribe";
import { useCallback } from "react";

interface PublishState {
  publish: () => Promise<void>;
}

export const usePublish = (subscription: Subscription | null): PublishState => {
  const publish = useCallback(async () => {
    if (subscription == null) return;

    await fetch("/api/publish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscription),
    });
  }, [subscription]);

  return { publish };
};
