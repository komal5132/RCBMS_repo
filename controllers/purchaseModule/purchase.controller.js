import {
    createPurchase,
    getAllPurchases,
    getPurchaseById,
    updatePurchase,
    approvePurchase,
    cancelPurchase
} from "../../services/purchaseModule/purchase.service.js";



// =======================================
// Create Purchase Order
// =======================================

export const createPurchaseController = async (
    req,
    res
) => {

    try {

        const purchase =
            await createPurchase(
                req.body,
                req.user?._id
            );


        res.status(201).json({

            success:true,

            message:
            "Purchase created successfully",

            data:purchase

        });


    } catch(error) {

        res.status(400).json({

            success:false,

            message:error.message

        });

    }

};




// =======================================
// Get All Purchases
// =======================================

export const getAllPurchasesController =
async(
    req,
    res
)=>{


    try {


        const purchases =
            await getAllPurchases();



        res.status(200).json({

            success:true,

            data:purchases

        });



    }
    catch(error)
    {

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};




// =======================================
// Get Purchase By ID
// =======================================

export const getPurchaseByIdController =
async(
    req,
    res
)=>{


    try {


        const purchase =
            await getPurchaseById(
                req.params.id
            );


        res.status(200).json({

            success:true,

            data:purchase

        });



    }
    catch(error)
    {

        res.status(404).json({

            success:false,

            message:error.message

        });

    }

};




// =======================================
// Update Purchase
// =======================================

export const updatePurchaseController =
async(
    req,
    res
)=>{


    try {


        const purchase =
            await updatePurchase(

                req.params.id,

                req.body

            );



        res.status(200).json({

            success:true,

            message:
            "Purchase updated successfully",

            data:purchase

        });



    }
    catch(error)
    {

        res.status(400).json({

            success:false,

            message:error.message

        });

    }

};




// =======================================
// Approve Purchase
// =======================================

export const approvePurchaseController =
async(
    req,
    res
)=>{


    try {


        const purchase =
            await approvePurchase(

                req.params.id,

                req.user?._id

            );



        res.status(200).json({

            success:true,

            message:
            "Purchase approved successfully",

            data:purchase

        });



    }
    catch(error)
    {

        res.status(400).json({

            success:false,

            message:error.message

        });

    }

};




// =======================================
// Cancel Purchase
// =======================================

export const cancelPurchaseController =
async(
    req,
    res
)=>{


    try {


        const purchase =
            await cancelPurchase(

                req.params.id

            );



        res.status(200).json({

            success:true,

            message:
            "Purchase cancelled successfully",

            data:purchase

        });



    }
    catch(error)
    {

        res.status(400).json({

            success:false,

            message:error.message

        });

    }

};