import express from "express";
const router = express.Router();
export default router;

import {getFiles, getFile} from "../queries/files.js";

router.get("/", async (req, res) => {
    const files = await getFiles();
    res.send(files);
});

/*
router.get("/:id", async (req, res) => {
    const file = await getFile(id);
    if (!file) return res.status()
    res.send(file);
})
*/

