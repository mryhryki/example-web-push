import { encodeBase64 } from "https://deno.land/std@0.221.0/encoding/base64.ts";

const keyPair = await crypto.subtle.generateKey(
  {
    name: "ECDSA",
    namedCurve: "P-256",
  },
  true,
  ["sign", "verify"],
);

const privateKey = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
await Deno.writeTextFile("./temp/private.key", encodeBase64(privateKey));

const publicKey = await crypto.subtle.exportKey("raw", keyPair.publicKey);
await Deno.writeTextFile("./temp/public.key", encodeBase64(publicKey));
