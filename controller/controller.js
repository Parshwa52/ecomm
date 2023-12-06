import express from "express";

import {
  addToCart,
  checkout,
  generatePromoCode,
  getCart,
  countOfItemsPurchased,
  getTotalPurchaseAmount,
  getTotalDiscountAmount,
  listDiscountCodes,
  listOrders,
} from "../service/service.js";

const router = express.Router();

//User APIs
router.post("/addToCart", addToCart);
router.post("/checkout", checkout);

//Admin APIs
router.get("/cart", getCart);
router.post("/generatePromoCode", generatePromoCode);
router.get("/itemsPurchased", countOfItemsPurchased);
router.get("/totalPurchaseAmount", getTotalPurchaseAmount);
router.get("/totalDiscountAmount", getTotalDiscountAmount);
router.get("/discountCodes", listDiscountCodes);
router.get("/orders", listOrders);

export default router;
