import express from "express";

import {
    createPurchasePaymentController,
    getAllPurchasePaymentsController,
    getPurchasePaymentByIdController,
} from "../../controllers/purchaseModule/purchasePayment.controller.js";

import {
    createPurchasePaymentValidation,
    purchasePaymentIdValidation,
} from "../../validation/purchaseModule/purchasePayment.validation.js";

import validate from "../../middlewares/validation.middleware.js";

const router = express.Router();



// =======================================
// Create Purchase Payment
// =======================================

router.post(
    "/create",

    validate(
        createPurchasePaymentValidation
    ),

    createPurchasePaymentController
);



// =======================================
// Get All Purchase Payments
// =======================================

router.get(
    "/all",

    getAllPurchasePaymentsController
);



// =======================================
// Get Purchase Payment By ID
// =======================================

router.get(
    "/:id",

    validate(
        purchasePaymentIdValidation,
        "params"
    ),

    getPurchasePaymentByIdController
);



export default router;