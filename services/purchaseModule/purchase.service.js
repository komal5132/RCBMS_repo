import PurchaseOrder from "../../models/purchaseModule/purchaseOrder.model.js";
import PurchaseReceipt from "../../models/purchaseModule/purchaseReceipt.model.js";

// =======================================
// Generate Purchase Number
// =======================================

const generatePurchaseNumber = async () => {
  const count = await PurchaseOrder.countDocuments();

  const number = count + 1;

  return `PO-${new Date().getFullYear()}-${String(number).padStart(4, "0")}`;
};

// =======================================
// Calculate Purchase Total
// =======================================

const calculatePurchaseTotal = (items, taxAmount = 0, discountAmount = 0) => {
  let subTotal = 0;

  items.forEach((item) => {
    item.amount = item.quantity * item.purchaseRate;

    subTotal += item.amount;
  });

  const totalAmount = subTotal + taxAmount - discountAmount;

  return {
    subTotal,
    totalAmount,
  };
};

// =======================================
// Create Purchase Order
// =======================================

export const createPurchase = async (data, userId) => {
  const purchaseNumber = await generatePurchaseNumber();

  const { subTotal, totalAmount } = calculatePurchaseTotal(
    data.items,
    data.taxAmount,
    data.discountAmount,
  );

  const purchase = await PurchaseOrder.create({
    ...data,

    purchaseNumber,

    subTotal,

    totalAmount,

    createdBy: userId,
  });

  return purchase;
};

// =======================================
// Get All Purchases
// =======================================

export const getAllPurchases = async () => {
  return await PurchaseOrder.find()

    .populate("supplierId", "supplierName supplierCode")

    .populate("items.materialId", "materialName materialCode")

    .sort({
      createdAt: -1,
    });
};

// =======================================
// Get Purchase By ID
// =======================================

export const getPurchaseById = async (id) => {
  const purchase = await PurchaseOrder.findById(id)

    .populate("supplierId")

    .populate("items.materialId");

  if (!purchase) {
    throw new Error("Purchase not found");
  }

  return purchase;
};

// =======================================
// Update Purchase
// =======================================

export const updatePurchase = async (id, data) => {
  const purchase = await PurchaseOrder.findById(id);

  if (!purchase) {
    throw new Error("Purchase not found");
  }

  if (purchase.status !== "DRAFT") {
    throw new Error("Only draft purchase can be updated");
  }

  if (data.items) {
    const { subTotal, totalAmount } = calculatePurchaseTotal(
      data.items,
      data.taxAmount,
      data.discountAmount,
    );

    data.subTotal = subTotal;

    data.totalAmount = totalAmount;
  }

  return await PurchaseOrder.findByIdAndUpdate(
    id,

    data,

    {
      new: true,
    },
  );
};

// =======================================
// Approve Purchase
// =======================================

export const approvePurchase = async (id, userId) => {
  const purchase = await PurchaseOrder.findById(id);

  if (!purchase) {
    throw new Error("Purchase not found");
  }

  if (purchase.status !== "DRAFT") {
    throw new Error("Only draft purchase can be approved");
  }

  purchase.status = "APPROVED";

  purchase.approvedBy = userId;

  purchase.approvedAt = new Date();

  await purchase.save();

  return purchase;
};

// =======================================
// Cancel Purchase
// =======================================

export const cancelPurchase = async (id) => {
  const purchase = await PurchaseOrder.findById(id);

  if (!purchase) {
    throw new Error("Purchase not found");
  }

  if (purchase.status === "RECEIVED") {
    throw new Error("Received purchase cannot be cancelled");
  }

  purchase.status = "CANCELLED";

  await purchase.save();

  return purchase;
};

export const updatePurchaseReceiptStatus = async (purchaseId) => {
  const purchase = await PurchaseOrder.findById(purchaseId);

  if (!purchase) {
    throw new Error("Purchase order not found");
  }

  // Get all approved receipts
  const receipts = await PurchaseReceipt.find({
    purchaseId,
    status: "APPROVED",
  });

  // Reset quantities
  purchase.items.forEach((item) => {
    item.receivedQuantity = 0;
    item.pendingQuantity = item.quantity;
  });

  // Sum received quantities
  receipts.forEach((receipt) => {
    receipt.items.forEach((receiptItem) => {
      const purchaseItem = purchase.items.find(
        (item) =>
          item.materialId.toString() === receiptItem.materialId.toString(),
      );

      if (purchaseItem) {
        purchaseItem.receivedQuantity += receiptItem.receivedQuantity;

        purchaseItem.pendingQuantity =
          purchaseItem.quantity - purchaseItem.receivedQuantity;
      }
    });
  });

  // Determine overall status
  const fullyReceived = purchase.items.every(
    (item) => item.pendingQuantity === 0,
  );

  const partiallyReceived = purchase.items.some(
    (item) => item.receivedQuantity > 0,
  );

  if (fullyReceived) {
    purchase.status = "RECEIVED";
  } else if (partiallyReceived) {
    purchase.status = "PARTIALLY_RECEIVED";
  } else {
    purchase.status = "APPROVED";
  }

  await purchase.save();

  return purchase;
};
