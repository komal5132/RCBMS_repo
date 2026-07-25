import {
    createPurchaseReceipt,
    getAllPurchaseReceipts,
    getPurchaseReceiptById,
    approvePurchaseReceipt,
    rejectPurchaseReceipt
} from "../../services/purchaseModule/purchaseReceipt.service.js";



// =======================================
// Create Purchase Receipt (GRN)
// =======================================

export const createPurchaseReceiptController =
async (req, res) => {

    try {

        const receipt =
            await createPurchaseReceipt(
                req.body,
                req.user?._id
            );


        res.status(201).json({

            success: true,

            message:
            "Purchase receipt created successfully",

            data: receipt

        });


    } catch(error) {

        res.status(400).json({

            success:false,

            message:error.message

        });

    }

};



// =======================================
// Get All Purchase Receipts
// =======================================

export const getAllPurchaseReceiptsController =
async(req,res)=>{

    try {

        const receipts =
            await getAllPurchaseReceipts();


        res.status(200).json({

            success:true,

            data:receipts

        });


    } catch(error) {

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



// =======================================
// Get Purchase Receipt By ID
// =======================================

export const getPurchaseReceiptByIdController =
async(req,res)=>{

    try {


        const receipt =
            await getPurchaseReceiptById(
                req.params.id
            );


        res.status(200).json({

            success:true,

            data:receipt

        });



    } catch(error) {

        res.status(404).json({

            success:false,

            message:error.message

        });

    }

};



// =======================================
// Approve Purchase Receipt
// =======================================

export const approvePurchaseReceiptController =
async(req,res)=>{


    try {


        const receipt =
            await approvePurchaseReceipt(

                req.params.id,

                req.user?._id

            );


        res.status(200).json({

            success:true,

            message:
            "Purchase receipt approved successfully",

            data:receipt

        });



    } catch(error) {

        res.status(400).json({

            success:false,

            message:error.message

        });

    }

};



// =======================================
// Reject Purchase Receipt
// =======================================

export const rejectPurchaseReceiptController =
async(req,res)=>{


    try {


        const receipt =
            await rejectPurchaseReceipt(
                req.params.id
            );


        res.status(200).json({

            success:true,

            message:
            "Purchase receipt rejected successfully",

            data:receipt

        });



    } catch(error) {

        res.status(400).json({

            success:false,

            message:error.message

        });

    }

};