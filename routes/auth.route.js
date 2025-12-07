import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("El email no es válido"),
    body("password", "Mínimo 6 caracteres").trim().isLength({ min: 6 }),
    body("password", "Formato de password incorrecto").custom(
      (value, { req }) => {
        if (value !== req.body.repassword) {
          throw new Error("Las contraseñas no coinciden");
        }
        return value;
      }
    ),
    // .withMessage("Formato de password incorrecto"),
  ],
  validationResultExpress,
  register
);
router.get(
  "/login",
  [
    body("email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("El email no es válido"),
    body("password", "Mínimo 6 caracteres").trim().isLength({ min: 6 }),
  ],
  validationResultExpress,

  login
);

export default router;
