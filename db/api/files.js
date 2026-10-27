import express from "express";
const router = express.Router();
export default router;

router.get("/", async (req, res) => {
    const files = await getFiles();
    res.send(files);
});


