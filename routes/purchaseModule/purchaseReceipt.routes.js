import express from "express";


import {
    createPurchaseReceiptController,
    getAllPurchaseReceiptsController,
    getPurchaseReceiptByIdController,
    approvePurchaseReceiptController,
    rejectPurchaseReceiptController
} from "../../controllers/purchaseModule/purchaseReceipt.controller.js";



import {
    createPurchaseReceiptValidation,
    purchaseReceiptIdValidation
} from "../../validation/purchaseModule/purchaseReceipt.validation.js";



import validate from "../../middlewares/validation.middleware.js";



const router = express.Router();



// =======================================
// Create Purchase Receipt (GRN)
// =======================================

router.post(

    "/create",

    validate(
        createPurchaseReceiptValidation
    ),

    createPurchaseReceiptController

);




// =======================================
// Get All Purchase Receipts
// =======================================

router.get(

    "/all",

    getAllPurchaseReceiptsController

);




// =======================================
// Get Receipt By ID
// =======================================

router.get(

    "/:id",

    validate(
        purchaseReceiptIdValidation,
        "params"
    ),

    getPurchaseReceiptByIdController

);




// =======================================
// Approve Receipt
// =======================================

router.patch(

    "/approve/:id",

    validate(
        purchaseReceiptIdValidation,
        "params"
    ),

    approvePurchaseReceiptController

);




// =======================================
// Reject Receipt
// =======================================

router.patch(

    "/reject/:id",

    validate(
        purchaseReceiptIdValidation,
        "params"
    ),

    rejectPurchaseReceiptController

);



export default router;