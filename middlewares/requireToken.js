import jwt from "jsonwebtoken";

export const requireToken = (req, res, next) => {
  try {
    let token = req.cookies.token;
    // console.log(token);
    if (!token) {
      throw new Error("A saber qué error es este");
    }
    // token = token.split(" ")[1]; //Bearer <token> me quedo con el token y quito la palabra Bearer
    // console.log(token);
    // me devuelve el payload y me quedo con el uid
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(payload);

    req.uid = uid;

    next();
  } catch (error) {
    console.log(error.message);
    const TokenVericationErrors = {
      "invalid signature": "La firma del JWT no es válida",
      "jwt expired": "El JWT ha expirado",
      "jwt malformed": "El JWT es incorrecto",
      "A saber qué error es este": "A saber qué error es este",
    };
    if (TokenVericationErrors[error.message]) {
      return res
        .status(401)
        .json({ errors: [{ msg: TokenVericationErrors[error.message] }] });
    }
  }
};

// export const requireTokenConCookies = (req, res, next) => {
//   try {
//     // let token = req.cookies.token || req.headers?.authorization;
//     let token = req.cookies.token ;
//     // console.log(token);
//     if (!token) {
//       throw new Error("No Bearer");
//     }
//     // token = token.split(" ")[1]; //Bearer <token> me quedo con el token y quito la palabra Bearer
//     // console.log(token);
//     // me devuelve el payload y me quedo con el uid
//     const { uid } = jwt.verify(token, process.env.JWT_SECRET);
//     // console.log(payload);

//     req.uid = uid;

//     next();
//   } catch (error) {
//     console.log(error.message);
//     const TokenVericationErrors = {
//       "invalid signature": "La firma del JWT no es válida",
//       "jwt expired": "El JWT ha expirado",
//       "jwt malformed": "El JWT es incorrecto",
//       "invalid token": "Token no válido",
//       "No Bearer": "Utiliza el formato Bearer"
//     };
//     if (TokenVericationErrors[error.message]) {
//       return res
//         .status(401)
//         .json({ errors: [{ msg: TokenVericationErrors[error.message] }] });
//     }
//   }
// };
