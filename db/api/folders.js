import express from "express";
const router = express.Router();
export default router;

import { getFolders, getFolder, createFileByFolderId } from "../queries/folders.js";

router.get("/", async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const folder = await getFolder(id);
  if (!folder) return res.status(404).send("Folder not found");
  return res.send(folder);
});

router.post("/:id/files", async (req, res) => {
    const { id } = req.params;

  if (!req.body) return res.status(400).send("Need body");
  const { name, size, folder_id } = req.body;
  if (!name || !size || !folder_id) {
    return res.status(400).send("Missing required fields");
  }

  const file =  await createFileByFolderId(id);
  if (!file) return res.status(404).send("Folder not found");
  
  return file;
});
