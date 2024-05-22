"use client";

import { usePublish } from '@/app/hooks/usePublish'
import { useServiceWorker } from '@/app/hooks/useServiceWorker'
import { useSubscribe } from '@/app/hooks/useSubscribe'
import { useEffect, useState } from 'react'

interface Subscription {
  endpoint: string
  auth: string
  p256dh: string
}

export default function Home() {
  const { registration } = useServiceWorker();
  const { subscribe, subscription: mySubscription } = useSubscribe(registration)

  const [subscription, setSubscription] = useState<Subscription | null>(mySubscription)
  useEffect(() => {
    setSubscription(mySubscription)
  }, [mySubscription])

  const { endpoint, auth, p256dh } = subscription ?? {}
  const hasValidSubscription = endpoint !== "" && auth !== "" && p256dh !== "";
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
          <li>Subscribe: {subscription != null ? 'Subscribed' : 'Not subscribed'} </li>
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
            Subscription:<br />
            <textarea
              style={{ width: '100%' }}
              rows={10}
              value={JSON.stringify(subscription, null, 2)}
              onChange={(event) => setSubscription(JSON.parse(event.target.value))}
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
