Deno.serve(async (request): Promise<Response> => {
  const path = request.url.endsWith("/") ? `${request.url}index.html` : request.url;

  const html = await Deno.readFile(`./static${path}`).catch(() => null);
  if (html != null) {
    return new Response(html, {
      headers: new Headers({
        "Content-Type": "text/html; charset=utf-8",
      }),
    });
  }

  return new Response("Not Found", {
    status: 404,
    headers: new Headers({
      "Content-Type": "text/plain; charset=utf-8",
    }),
  });
});
