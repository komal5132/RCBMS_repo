import mongoose from "mongoose";


// =======================================
// Purchase Receipt Item Schema
// =======================================

const receiptItemSchema = new mongoose.Schema(
{
    materialId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MaterialMaster",
        required: true,
    },


    orderedQuantity: {
        type: Number,
        required: true,
        min: 0,
    },


    receivedQuantity: {
        type: Number,
        required: true,
        min: 0,
    },


    rejectedQuantity: {
        type: Number,
        default: 0,
        min: 0,
    },


    uomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UnitOfMeasure",
        required: true,
    },


    purchaseRate: {
        type: Number,
        required: true,
        min: 0,
    },


    rejectionReason: {
        type: String,
        trim: true,
        maxlength: 300,
    },


},
{
    _id:false
});



// =======================================
// Purchase Receipt Schema
// =======================================

const purchaseReceiptSchema = new mongoose.Schema(
{

    // Auto generated GRN number
    receiptNumber: {

        type:String,

        unique:true,

        trim:true,

        uppercase:true,

    },


    // Reference Purchase Order

    purchaseId: {

        type:mongoose.Schema.Types.ObjectId,

        ref:"PurchaseOrder",

        required:true,

    },


    // Supplier Reference

    supplierId: {

        type:mongoose.Schema.Types.ObjectId,

        ref:"Supplier",

        required:true,

    },


    receivedDate: {

        type:Date,

        default:Date.now,

    },


    items: {

        type:[receiptItemSchema],

        required:true,

        validate:{

            validator:function(items){

                return items.length > 0;

            },

            message:
            "Receipt must contain at least one item"

        }

    },


    totalReceivedAmount: {

        type:Number,

        default:0,

    },


    status: {

        type:String,

        enum:[

            "DRAFT",

            "PENDING_APPROVAL",

            "APPROVED",

            "REJECTED"

        ],

        default:"DRAFT"

    },


    qualityStatus: {

        type:String,

        enum:[

            "PENDING",

            "PASSED",

            "FAILED"

        ],

        default:"PENDING"

    },


    notes: {

        type:String,

        trim:true,

        maxlength:500,

    },


    receivedBy: {

        type:mongoose.Schema.Types.ObjectId,

        ref:"User",

    },


    approvedBy: {

        type:mongoose.Schema.Types.ObjectId,

        ref:"User",

    },


    approvedAt: {

        type:Date,

    },


    isActive:{

        type:Boolean,

        default:true,

    }


},
{
    timestamps:true
});



// Indexes

purchaseReceiptSchema.index(
{
    purchaseId:1
});


purchaseReceiptSchema.index(
{
    supplierId:1
});


purchaseReceiptSchema.index(
{
    status:1
});



const PurchaseReceipt =
mongoose.model(
    "PurchaseReceipt",
    purchaseReceiptSchema
);


export default PurchaseReceipt;