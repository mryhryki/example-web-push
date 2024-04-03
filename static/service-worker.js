self.addEventListener("push", async (event) => {
  const payload = event.data.json();
  console.debug("Payload:", payload)
  await self.registration.showNotification("TEST", {
    body: 'description'
  });
})
