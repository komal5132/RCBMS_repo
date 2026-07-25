import PurchaseReceipt from "../models/purchaseModule/purchaseReceipt.model.js";
import MaterialMaster from "../models/materialMaster.model.js";

import { updateMaterialInventory } from "../services/inventoryServices/inventory.service.js";

import { createInventoryTransaction } from "../services/inventoryServices/inventoryTransaction.service.js";

// =======================================
// Add Purchase Stock Into Inventory
// =======================================

export const addPurchaseStock = async (receiptId, userId) => {

    const receipt = await PurchaseReceipt.findById(receiptId);

    if (!receipt) {
        throw new Error("Purchase receipt not found");
    }

    if (receipt.status !== "APPROVED") {
        throw new Error("Only approved receipt can update inventory");
    }

    const transactions = [];

    for (const item of receipt.items) {

        // Ignore rejected / zero quantity
        const receivedQty = item.receivedQuantity;

        if (receivedQty <= 0) {
            continue;
        }

        // ---------------------------------
        // Get Material Before Update
        // ---------------------------------

        const material = await MaterialMaster.findById(item.materialId);

        if (!material) {
            throw new Error("Material not found");
        }

        const openingQty = material.currentStock;

        // ---------------------------------
        // Update Material Inventory
        // ---------------------------------

        const updatedMaterial = await updateMaterialInventory(
            item.materialId,
            receivedQty,
            item.purchaseRate
        );

        const closingQty = updatedMaterial.currentStock;

        const amount = receivedQty * item.purchaseRate;

        // ---------------------------------
        // Create Inventory Ledger Entry
        // ---------------------------------

        const transaction = await createInventoryTransaction({

            transactionType: "PURCHASE_RECEIVE",

            referenceType: "PURCHASE_RECEIPT",

            referenceId: receipt._id,

            materialId: item.materialId,

            uomId: item.uomId,

            movementType: "IN",

            quantity: receivedQty,

            openingQty,

            closingQty,

            rate: item.purchaseRate,

            amount,

            averageCost: updatedMaterial.averageCost,

            transactionDate: receipt.receivedDate,

            remarks: `Stock received through GRN ${receipt.receiptNumber}`,

            createdBy: userId

        });

        transactions.push(transaction);
    }

    return transactions;
};