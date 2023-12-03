import { Request, Response } from "express";
import prisma from "../db/prisma/client";
import busboy, { FileInfo } from "busboy";
import path from "path";
import fs from "fs";
import { Readable } from "stream";

export const uploadExcel = (req: Request, res: Response): void => {
  try {
    if (!req.headers["content-type"] || !req.headers["content-type"].includes("multipart/form-data")) {
      res.status(400).send("Invalid content type. Expecting multipart/form-data.");
      return;
    }

    const bb = busboy({ headers: req.headers });

    bb.on("file", (fieldname: string, file: Readable, filename: FileInfo) => {
      const saveTo = path.join(__dirname, "uploads/");
      if (!fs.existsSync(saveTo)) {
        fs.mkdirSync(saveTo, { recursive: true });
      }
      file.pipe(fs.createWriteStream(saveTo + filename.filename));
    });

    bb.on("finish", () => {
      console.log("Busboy finished parsing the form!");
      res.json({ message: "Form data processed successfully" });
    });

    req.pipe(bb);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    res.writeHead(200, { Connection: "close" });
    res.end(`
      <html>
        <head></head>
        <body>
					<form enctype="multipart/form-data" method="POST" action="/api/uploadExcel">
						<input type="file" name="file" />
						<input type="submit" value="Submit" />
					</form>
        </body>
      </html>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
