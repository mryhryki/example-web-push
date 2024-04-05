"use client";

import { usePublish } from "@/app/hooks/usePublish";
import { useServiceWorker } from "@/app/hooks/useServiceWorker";
import { useSubscribe } from "@/app/hooks/useSubscribe";
import { useEffect, useState } from "react";

export default function Home() {
  const { registration } = useServiceWorker();
  const { subscribe, subscription: pushSubscription } = useSubscribe(registration);

  const [endpoint, setEndpoint] = useState("");
  const [auth, setAuth] = useState("");
  const [p256dh, setP256dh] = useState("");
  const subscription = { endpoint, auth, p256dh };
  const hasValidSubscription = endpoint !== "" && auth !== "" && p256dh !== "";

  const { publish } = usePublish(subscription);
  useEffect(() => {
    if (pushSubscription == null) return;
    setEndpoint(pushSubscription.endpoint);
    setAuth(pushSubscription.auth);
    setP256dh(pushSubscription.p256dh);
  }, [pushSubscription]);

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
          <li>Subscribe: {pushSubscription != null ? "Subscribed" : "Not subscribed"} </li>
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

      </section>
      <section>
        <h2>Subscription</h2>
        <p>
          <label>
            endpoint<br/>
            <input
              type="text"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            auth<br/>
            <input
              type="text"
              value={auth}
              onChange={(e) => setAuth(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            p256dh<br/>
            <input
              type="text"
              value={p256dh}
              onChange={(e) => setP256dh(e.target.value)}
            />
          </label>
        </p>
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
              disabled={!hasValidSubscription}
            />
          </label>
        </p>
        <p>
          <label>
            Body<br />
            <input
              type="text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              disabled={!hasValidSubscription}
            />
          </label>
        </p>
        <p>
          <button
            onClick={() => publish(title, body)}
            style={{ padding: "0.5em 1em" }}
            disabled={!hasValidSubscription}
          >
            Publish
          </button>
        </p>
      </section>
    </main>
  );
}
