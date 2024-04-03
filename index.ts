import { encodeBase64 } from "https://deno.land/std@0.221.0/encoding/base64.ts";

const keyPair = await crypto.subtle.generateKey({
  name: "ECDSA",
  namedCurve: "P-256",
}, false, ["sign", "verify"]);

Deno.serve(async (request): Promise<Response> => {
  const {pathname} = new URL(request.url)
  const filePath = pathname.endsWith("/") ? `./static${pathname}index.html` : `./static${pathname}`;

  const html: Uint8Array | null = await Deno.readFile(filePath).catch(() => null);
  if (html != null) {
    const publicKey = await crypto.subtle.exportKey("raw", keyPair.publicKey)
    const htmlString = new TextDecoder().decode(html).replace("'[[PUBLIC-KEY]]'", JSON.stringify(encodeBase64(new Uint8Array(publicKey))));
    return new Response(htmlString, {
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
