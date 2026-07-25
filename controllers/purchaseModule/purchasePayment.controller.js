import {
    createPurchasePayment,
    getAllPurchasePayments,
    getPurchasePaymentById,
} from "../../services/purchaseModule/purchasePayment.service.js";



// =======================================
// Create Purchase Payment
// =======================================

export const createPurchasePaymentController =
async (req, res) => {

    try {

        const payment =
            await createPurchasePayment(
                req.body,
                req.user?._id
            );

        res.status(201).json({

            success: true,

            message:
                "Purchase payment created successfully",

            data: payment,

        });

    } catch (error) {

        res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};



// =======================================
// Get All Purchase Payments
// =======================================

export const getAllPurchasePaymentsController =
async (req, res) => {

    try {

        const payments =
            await getAllPurchasePayments();

        res.status(200).json({

            success: true,

            data: payments,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};



// =======================================
// Get Purchase Payment By ID
// =======================================

export const getPurchasePaymentByIdController =
async (req, res) => {

    try {

        const payment =
            await getPurchasePaymentById(
                req.params.id
            );

        res.status(200).json({

            success: true,

            data: payment,

        });

    } catch (error) {

        res.status(404).json({

            success: false,

            message: error.message,

        });

    }

};