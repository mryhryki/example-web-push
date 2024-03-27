Deno.serve(async (request): Promise<Response> => {
  const {pathname} = new URL(request.url)
  const filePath = pathname.endsWith("/") ? `./static${pathname}index.html` : `./static${pathname}`;

  const html = await Deno.readFile(filePath).catch(() => null);
  if (html != null) {
    return new Response(html, {
      status: 200,
      headers: new Headers({
        "Content-Type": getMimeType(filePath),
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

const getMimeType = (filePath: string): string => {
  if (filePath.endsWith(".html")) {
    return "text/html; charset=utf-8";
  } else if (filePath.endsWith(".js")) {
    return "text/javascript";
  }
  return "text/plain; charset=utf-8";
}
