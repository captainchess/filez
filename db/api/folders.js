import express from "express";
const router = express.Router();
export default router;

import { getFolders, getFolder, getFolderWithFiles } from "../queries/folders.js";
import { createFile } from "#db/queries/files";

router.get("/", async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});

router.param("id", async (req, res, next, id) => {
  const folder = await getFolder(id);
  if (!folder) return res.status(404).send("Folder not found.");

  req.folder = folder;
  next();
});

router.get("/:id", async (req, res) => {
  const folder = await getFolderWithFiles(req.folder.id);
  if (!folder) return res.status(404).send("Folder not found.");
  return res.send(folder);
});

router.post("/:id/files", async (req, res) => {
  if (!req.body) return res.status(400).send("Need body.");

  const { name, size } = req.body;
  if (!name || !size) {
    return res.status(400).send("Missing required fields.");
  }

  const file = await createFile(name, size, req.folder.id);
  res.status(201).send(file);
});
