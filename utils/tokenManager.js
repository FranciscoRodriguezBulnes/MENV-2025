import jwt from "jsonwebtoken";

export const generateTokens = (uid) => {
  const expiresIn = 60 * 60 * 24;

  try {
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, {
      expiresIn: expiresIn,
    });
    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};

export const generateRefreshToken = (uid, res) => {
  const expiresIn = 60 * 60 * 24 * 30;
  try {
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
      expiresIn: expiresIn,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !(process.env.MODO === "developer"),
      sameSite: "strict",
      expires: new Date(Date.now() + expiresIn * 1000),
      //  maxAge: expiresIn * 1000,
    });
    return refreshToken;
  } catch (error) {
    console.log(error);
  }
};

export const tokenVericationErrors = {
  "invalid signature": "La firma del JWT no es válida",
  "jwt expired": "El JWT ha expirado",
  "jwt malformed": "El JWT es incorrecto",
  "No Bearer": "Utiliza el formato Bearer",
  "A saber qué error es este": "A saber qué error es este",
};
// if (tokenVericationErrors[error.message]) {
//   return res
//     .status(401)
//     .json({ errors: [{ msg: tokenVericationErrors[error.message] }] });
// }
