import express from "express";
import materialCategory from "../routes/masterDataRoutes/materialCategory.routes.js";
import materialSubCategory from "../routes/masterDataRoutes/materialSubCategory.routes.js";
import unitOfMeasure from "../routes/masterDataRoutes/unitOfMeasure.routes.js";
const router = express.Router();

router.use("/materialCategory", materialCategory);
router.use("/materialSubCategory", materialSubCategory);
router.use("/unitOfMeasure", unitOfMeasure);

export default router;
