"use client";

import { usePublish } from "@/app/hooks/usePublish";
import { useServiceWorker } from "@/app/hooks/useServiceWorker";
import { useSubscribe } from "@/app/hooks/useSubscribe";
import { getAppPublicKey } from "@/app/util/keys";

export default function Home() {
  const registration = useServiceWorker();
  const { subscribe, subscription } = useSubscribe(getAppPublicKey(), registration);
  const { publish } = usePublish(subscription);

  return (
    <main>
      <h1>
        <a
          href="https://github.com/mryhryki/example-web-push"
          target="_blank"
          rel="noopener noreferrer"
        >
          mryhryki/example-web-push
        </a>
      </h1>

      <section>
        <h2>Status</h2>
        <ul>
          <li>Service Worker: {registration != null ? "Registered" : "Not registered"}</li>
          <li>Subscribe: {subscription != null ? "Subscribed" : "Not subscribed"} </li>
        </ul>
      </section>

      <section>
        <h2>Subscribe</h2>
        <p>
          <button
            onClick={subscribe}
            style={{ padding: "0.5em 1em" }}
            disabled={registration == null}
          >
            Subscribe
          </button>
        </p>
        {subscription != null && (
          <ul>
            <li>Endpoint: <code>{subscription.endpoint}</code></li>
            <li>auth: <code>{subscription.auth}</code></li>
            <li>p256dh: <code>{subscription.p256dh}</code></li>
          </ul>
        )}
      </section>

      <section>
        <h2>Subscribe</h2>
        <p>
          <button
            onClick={publish}
            style={{ padding: "0.5em 1em" }}
            disabled={subscription == null}
          >
            Publish
          </button>
        </p>
      </section>
    </main>
  );
}
