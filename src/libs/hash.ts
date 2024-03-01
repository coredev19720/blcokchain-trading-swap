import crypto from "crypto";

export const encrypt = (text: string) => {
  const algorithm = process.env.TOKEN_AL || "aes-128-cbc";
  const secretKey = process.env.TOKEN_SK || "";
  const iv = process.env.TOKEN_IV || "";
  console.log("encrypt text", text);
  console.log("encrypt algorithm", algorithm);
  console.log("encrypt secretKey", secretKey);
  try {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return encrypted.toString("hex");
  } catch (error) {
    console.log("encrypt error", error);
    throw new Error(`MSG_001`); // encrypt error
  }
};

export const decrypt = (token: string) => {
  try {
    const algorithm = process.env.TOKEN_AL || "aes-128-cbc";
    const secretKey = process.env.TOKEN_SK || "";
    const iv = process.env.TOKEN_IV || "";
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    const firstPart = decipher.update(token, "hex");
    const lastPart = decipher.final();
    console.log("decrypted", `${firstPart}${lastPart}`);
    return `${firstPart}${lastPart}`;
  } catch (error) {
    throw new Error(`MSG_002`); // encrypt error
  }
};
