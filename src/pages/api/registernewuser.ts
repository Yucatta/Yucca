import csvParser from "csv-parser";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { createObjectCsvStringifier } from "csv-writer";
import { Stream, Readable } from "stream";
// import { fromReadableStream } from "@aws-sdk/node-http-handler";
import { promisify } from "util";
import type { NextApiRequest, NextApiResponse } from "next";
import { receiveMessageOnPort } from "worker_threads";
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
  Userinformation: Array<{
    UID: string;
    Displayname: string;
  }>;
}
const s3Client = new S3Client({
  region: "auto",
  endpoint: ENDPOINT,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
  },
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { Userinformation } = req.body as MessageLogRequestBody;
  try {
    if (req.method === "POST") {
      const csvStringifier = createObjectCsvStringifier({
        header: [
          { id: "uid", title: "UID" },
          { id: "displayname", title: "displayname" },
        ],
      });
      const csvContent =
        csvStringifier.getHeaderString() +
        csvStringifier.stringifyRecords(messagehistory);
      const putObjectCommand = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `${SortedList[0]}-AND-${SortedList[1]}.csv`,
        Body: csvContent,
        ContentType: "text/csv",
      });
      console.log(csvContent, "yes csvdata");

      await s3Client.send(putObjectCommand);

      res.status(200).json({ message: "Data successfully written to CSV" });
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error in API route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
