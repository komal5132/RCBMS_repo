import PurchasePayment from "../../models/purchaseModule/purchasePayment.model.js";
import PurchaseOrder from "../../models/purchaseModule/purchaseOrder.model.js";

// =======================================
// Generate Payment Number
// =======================================

const generatePaymentNumber = async () => {
  const count = await PurchasePayment.countDocuments();

  return `PAY-${new Date().getFullYear()}-${String(count + 1).padStart(4, "0")}`;
};

// =======================================
// Create Purchase Payment
// =======================================

export const createPurchasePayment = async (data, userId) => {
  const purchase = await PurchaseOrder.findById(data.purchaseId);

  if (!purchase) {
    throw new Error("Purchase order not found");
  }

  // Purchase must be approved

  if (purchase.status === "DRAFT" || purchase.status === "CANCELLED") {
    throw new Error("Purchase order is not eligible for payment");
  }

  // Prevent over payment

  if (data.paymentAmount > purchase.balanceAmount) {
    throw new Error("Payment amount exceeds balance amount");
  }

  const paymentNumber = await generatePaymentNumber();

  const payment = await PurchasePayment.create({
    ...data,

    paymentNumber,

    createdBy: userId,
  });

  // ------------------------
  // Update Purchase Summary
  // ------------------------

  purchase.paidAmount += data.paymentAmount;

  purchase.balanceAmount = purchase.totalAmount - purchase.paidAmount;

  if (purchase.balanceAmount === 0) {
    purchase.paymentStatus = "PAID";
  } else if (purchase.paidAmount > 0) {
    purchase.paymentStatus = "PARTIALLY_PAID";
  } else {
    purchase.paymentStatus = "UNPAID";
  }

  await purchase.save();

  return payment;
};

// =======================================
// Get All Payments
// =======================================

export const getAllPurchasePayments = async () => {
  return await PurchasePayment.find()

    .populate("purchaseId", "purchaseNumber")

    .populate("supplierId", "supplierName supplierCode")

    .sort({
      createdAt: -1,
    });
};

// =======================================
// Get Payment By ID
// =======================================

export const getPurchasePaymentById = async (id) => {
  const payment = await PurchasePayment.findById(id)

    .populate("purchaseId")

    .populate("supplierId");

  if (!payment) {
    throw new Error("Payment not found");
  }

  return payment;
};
