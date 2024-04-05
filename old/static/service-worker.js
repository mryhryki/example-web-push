self.addEventListener("push", async (event) => {
  console.debug("PushEvent:", event)
  const payload = event.data?.json();
  console.debug("Payload:", payload)
  await self.registration.showNotification("TEST", {
    body: 'description'
  });
})
