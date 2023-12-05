import express from "express";

import { service } from "../service/service.js";

const router = express.Router();

router.get("/first", service);

export default router;
