import webpush from "web-push";

const main = async () => {
  // const keyPair = await crypto.subtle.generateKey(
  //   {
  //     name: "ECDSA",
  //     namedCurve: "P-256",
  //   },
  //   true,
  //   ["sign", "verify"],
  // );

  // const privateKey = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
  // const publicKey = await crypto.subtle.exportKey("raw", keyPair.publicKey);

  const vapidKeys = webpush.generateVAPIDKeys();
  const base64EncodedPrivateKey = Buffer.from(vapidKeys.privateKey).toString("base64url");
  console.log("[Application Private Key]\n%s\n", base64EncodedPrivateKey);

  const base64EncodedPublicKey = Buffer.from(vapidKeys.publicKey).toString("base64url");
  console.log("[Application Public Key]\n%s\n", base64EncodedPublicKey);
}

main()
