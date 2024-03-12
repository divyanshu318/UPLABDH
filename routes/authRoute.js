import express from "express";
import { LoginController, OtpVerificationController, ProfSignupController, StudentSignupController } from "../controllers/authController.js";

const router = express.Router();

router.post('/studentSignup',StudentSignupController);
router.post('/login',LoginController);
router.post('/profSignup',ProfSignupController);
router.post('/otpVerification',OtpVerificationController);

export default router;