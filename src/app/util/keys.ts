const getRequiredValue = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable ${key}`);
  }
  return value;
};

export const getServerPrivateKey = () => getRequiredValue("SERVER_PRIVATE_KEY");
export const getServerPublicKey = () => getRequiredValue("SERVER_PUBLIC_KEY");
