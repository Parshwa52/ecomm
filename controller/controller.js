import express from "express";

import { addToCart, getCart } from "../service/service.js";

const router = express.Router();

router.post("/addToCart", addToCart);
router.get("/cart", getCart);

export default router;
