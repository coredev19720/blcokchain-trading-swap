import crypto from "crypto";

export const encrypt = (text: string) => {
  const algorithm = process.env.NEXT_PUBLIC_TOKEN_AL || "";
  const secretKey = process.env.NEXT_PUBLIC_TOKEN_SK || "";
  const iv = process.env.NEXT_PUBLIC_TOKEN_IV || "";
  try {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return encrypted.toString("hex");
  } catch (error) {
    throw new Error(`MSG_001`); // encrypt error
  }
};

export const decrypt = (token: string) => {
  try {
    const algorithm = process.env.NEXT_PUBLIC_TOKEN_AL || "aes-128-cbc";
    const secretKey = process.env.NEXT_PUBLIC_TOKEN_SK || "";
    const iv = process.env.NEXT_PUBLIC_TOKEN_IV || "";
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    const firstPart = decipher.update(token, "hex");
    const lastPart = decipher.final();
    return `${firstPart}${lastPart}`;
  } catch (error) {
    throw new Error(`MSG_002`); // decrypt error
  }
};
