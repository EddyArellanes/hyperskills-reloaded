import { Router } from "express";
const router = Router();

import {
  getWallets,
  getWallet,
  createWallet,
  updateWallet,
  deleteWallet
} from "../controllers/wallet.controller";

router.get("/wallets", getWallets);
router.get("/wallet/:id", getWallet);
router.post("/wallets", createWallet);
router.put("/wallets/:id", updateWallet);
router.delete("/wallets/:id", deleteWallet);

export default router;