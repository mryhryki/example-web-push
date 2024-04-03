// ==================== Base64 ====================

const Base64Chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

/**
 * @param data {Uint8Array}
 * @return {string}
 */
export function encodeBase64(data, urlsafe = false) {
  const results = [];
  data.forEach((code, i) => {
    const afterCode = data[i + 1];
    switch (i % 3) {
      case 0:
        results.push(Base64Chars[code >> 2]);
        results.push(Base64Chars[((code & 3) << 4) | ((afterCode ?? 0) >> 4)]);
        return;
      case 1:
        results.push(Base64Chars[((code & 15) << 2) | ((afterCode ?? 0) >> 6)]);
        return;
      case 2:
        results.push(Base64Chars[code & 63]);
        return;
    }
  });

  if (urlsafe) {
    return results
      .join("")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  }

  Array.from({ length: 4 - (results.length % 4 || 4) }).forEach(() =>
    results.push("="),
  );
  return results.join("");
}

/**
 * @param base64 {string}
 * @returns {Uint8Array}
 */
export function decodeBase64(base64) {
  const results = [];
  const mapping = Base64Chars.split("").reduce(
    (acc, c, i) => ({ ...acc, [c]: i }),
    {},
  );

  let current = 0;
  base64
    .replace(/(\r?\n)/g, "")
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .split("")
    .forEach((c, i) => {
      const char = mapping[c];
      if (char == null) return;
      switch (i % 4) {
        case 0:
          current = char << 2;
          return;
        case 1:
          results.push(current | (char >> 4));
          current = (char & 15) << 4;
          return;
        case 2:
          results.push(current | ((char & 63) >> 2));
          current = (char & 3) << 6;
          return;
        case 3:
          results.push(current | (char & 63));
          current = 0;
          return;
      }
    });
  if (current !== 0) {
    results.push(current);
  }
  return new Uint8Array(results);
}
