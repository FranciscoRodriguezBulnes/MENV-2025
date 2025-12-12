import jwt from "jsonwebtoken";
import { tokenVericationErrors } from "../utils/tokenManager.js";

export const requireRefreshTokenOK = (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    if (!refreshTokenCookie) throw new Error("No hay token");

    const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
    req.uid = uid;

    next();
  } catch (error) {
    console.log(error.message);

    return res
      .status(401)
      .json({ errors: tokenVericationErrors[error.message] });
  }
};
