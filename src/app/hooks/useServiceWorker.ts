import { useEffect, useRef, useState } from "react";


export const useServiceWorker = (): ServiceWorkerRegistration | null => {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const initialized = useRef<boolean>(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(setRegistration)
        .catch(console.error);
    }
  }, []);


  return registration;
};
