// useSocket.ts
import { useState, useEffect } from "react";
//@ts-ignore
import io from "socket.io-client";
import { socketCfg } from "@/src/constants/config";

export const useSocket = () => {
  const [socket, setSocket] = useState<io.Socket | null>(null);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_URL ?? "";
    const skt: io.Socket = io(url, {
      transports: socketCfg.transport,
      path: socketCfg.path,
      query: {
        __sails_io_sdk_version: socketCfg.version,
        __sails_io_sdk_platform: socketCfg.platform,
        __sails_io_sdk_language: socketCfg.lang,
      },
    });
    setSocket(skt);
    skt.on("connect", () => console.log("Connected to the server"));
    skt.on("disconnect", () => console.log("Disconnected from the server"));

    return () => {
      if (skt) {
        skt.disconnect();
      }
    };
  }, []);

  return socket;
};
