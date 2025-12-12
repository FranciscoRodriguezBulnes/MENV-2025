import { validationResult } from "express-validator";
import { body } from "express-validator";

export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const bodyRegisterValidator = [
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
  validationResultExpress,
];

export const bodyLoginValidator = [
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("El email no es válido"),
  body("password", "Mínimo 6 caracteres").trim().isLength({ min: 6 }),
  validationResultExpress,
];
