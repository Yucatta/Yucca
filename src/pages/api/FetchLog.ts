import csvParser from "csv-parser";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { createObjectCsvStringifier } from "csv-writer";
import { Stream, Readable } from "stream";
import { promisify } from "util";
import type { NextApiRequest, NextApiResponse } from "next";
import { send } from "process";
const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME;
const ACCESS_KEY = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
const SECRET_KEY = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
const ENDPOINT = process.env.CLOUDFLARE_R2_ENDPOINT;

if (!ACCESS_KEY || !SECRET_KEY || !ENDPOINT) {
  throw new Error(
    "Missing Cloudflare R2 credentials or endpoint in environment variables."
  );
}
interface MessageLogRequestBody {
  Sender: string;
  Receiver: string;
}
const s3Client = new S3Client({
  region: "auto",
  endpoint: ENDPOINT,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
  },
});
let csvData: Array<object> = [];
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   console.log(messagehistory[0], "this is messagehistory");
  if (req.method === "GET") {
    const { sender, receiver } = req.query;
    const sortedlist = [sender, receiver].sort();
    console.log(sender, receiver);
    try {
      const getObjectCommand = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `${sortedlist[0]}-AND-${sortedlist[1]}.csv`,
      });
      const response = await s3Client.send(getObjectCommand);
      if (!response) {
        return;
      }
      const streamToString = promisify(Stream.pipeline);
      if (!response.Body) {
        throw new Error("no respone Body");
      }
      await streamToString(
        response.Body.pipe(csvParser()),
        new Stream.Writable({
          objectMode: true,
          write(chunk, encoding, callback) {
            csvData.push(chunk);
            callback();
          },
        })
      );
      console.log(csvData);

      res.status(200).json({
        message: "Data successfully written to CSV",
        csvdata: csvData,
      });
      csvData = [];
    } catch (error: any) {
      return res.status(404).json({ error: "File not found" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
