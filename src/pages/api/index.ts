"use strict";
const axios = require("axios");
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        res.status(200).json("success");
      } catch (e: any) {
        console.log(e);
        res.status(400).json({ reason: e.message || "serverInternalError" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
