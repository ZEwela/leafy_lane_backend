import express, { Request, Response } from "express";
import { uploadFileMiddleware } from "../upload";
import fs from "fs";

export const fileRouter = express.Router();

fileRouter.post("/upload", async (req: Request, res: Response) => {
  try {
    await uploadFileMiddleware(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file?.originalname}. ${err}. File size cannot be larger than 2MB!`,
    });
  }
});
fileRouter.get("/", (req: Request, res: Response) => {
  const directoryPath = __dirname + "/../../frontend/public/images/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos: any = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: req.baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
});

fileRouter.get("/file/:name", (req: Request, res: Response) => {
  const fileName = req.params.name;
  const directoryPath = __dirname + "/../../frontend/public/images/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
});
