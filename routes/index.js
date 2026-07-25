import express from "express";
import materialCategory from "./masterDataRoutes/materialCategory.routes.js";
import materialSubCategory from "./masterDataRoutes/materialSubCategory.routes.js";
import unitOfMeasure from "./masterDataRoutes/unitOfMeasure.routes.js";
import materialMaster from "./materialMaster.routes.js";
import supplierMaster from "./supplier.routes.js";
import inventoryMaster from "./inventory.routes.js";
import purchaseOrderMaster from "./purchaseModule/purchase.routes.js";
import purchaseReceiptMaster from "./purchaseModule/purchaseReceipt.routes.js";
import purchasePaymentMaster from "./purchaseModule/purchasePayment.routes.js";
const router = express.Router();

router.use("/materialCategory", materialCategory);
router.use("/materialSubCategory", materialSubCategory);
router.use("/unitOfMeasure", unitOfMeasure);
router.use("/materialMaster", materialMaster);
router.use("/supplierMaster", supplierMaster);
router.use("/inventoryMaster", inventoryMaster);
router.use("/purchaseOrderMaster", purchaseOrderMaster);
router.use("/purchaseReceiptMaster", purchaseReceiptMaster);
router.use("/purchasePaymentMaster", purchasePaymentMaster);

export default router;
