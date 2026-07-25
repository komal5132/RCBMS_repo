import express from "express";

import {
    createPurchaseController,
    getAllPurchasesController,
    getPurchaseByIdController,
    updatePurchaseController,
    approvePurchaseController,
    cancelPurchaseController
} from "../../controllers/purchaseModule/purchase.controller.js";


// Validation imports
import {
    createPurchaseValidation,
    updatePurchaseValidation,
    purchaseIdValidation
} from "../../validation/purchaseModule/purchase.validation.js";


// Validation middleware
import validate from "../../middlewares/validation.middleware.js";


const router = express.Router();



// =======================================
// Create Purchase Order
// =======================================

router.post(
    "/create",
    validate(createPurchaseValidation),
    createPurchaseController
);



// =======================================
// Get All Purchases
// =======================================

router.get(
    "/getAll",
    getAllPurchasesController
);



// =======================================
// Get Purchase By ID
// =======================================

router.get(
    "/getById/:id",
    validate(purchaseIdValidation, "params"),
    getPurchaseByIdController
);



// =======================================
// Update Purchase
// =======================================

router.put(
    "/update/:id",
    validate(purchaseIdValidation, "params"),
    validate(updatePurchaseValidation),
    updatePurchaseController
);



// =======================================
// Approve Purchase
// =======================================

router.patch(
    "/approve/:id",
    validate(purchaseIdValidation, "params"),
    approvePurchaseController
);



// =======================================
// Cancel Purchase
// =======================================

router.patch(
    "/cancel/:id",
    validate(purchaseIdValidation, "params"),
    cancelPurchaseController
);



export default router;