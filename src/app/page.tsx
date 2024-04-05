"use client";

import { usePublish } from "@/app/hooks/usePublish";
import { useServiceWorker } from "@/app/hooks/useServiceWorker";
import { useSubscribe } from "@/app/hooks/useSubscribe";
import { useState } from "react";

export default function Home() {
  const { registration } = useServiceWorker();
  const { subscribe, subscription } = useSubscribe(registration);
  const { publish } = usePublish(subscription);

  const [title, setTitle] = useState("Title");
  const [body, setBody] = useState("Body");

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
            <li>Endpoint: <code>{subscription.endpoint.substring(0, 50)}...</code></li>
            <li>auth: <code>{subscription.auth.substring(0, 5)}...</code></li>
            <li>p256dh: <code>{subscription.p256dh.substring(0, 12)}...</code></li>
          </ul>
        )}
      </section>

      <section>
        <h2>Publish</h2>
        <p>
          <label>
            Title<br />
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              disabled={subscription == null}
            />
          </label>
        </p>
        <p>
          <label>
            Body:<br />
            <input
              type="text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              disabled={subscription == null}
            />
          </label>
        </p>
        <p>
          <button
            onClick={() => publish(title, body)}
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
