import express from "express";
import materialCategory from "../routes/materialCategory.routes.js";
const router = express.Router();

router.use("/materialCategory", materialCategory);

export default router