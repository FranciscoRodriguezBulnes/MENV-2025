import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { generateRefreshToken, generateTokens } from "../utils/tokenManager.js";

export const register = async (req, res) => {
  console.log(req.body);
  // res.json({ ok: "Register" });
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });

    //Buscar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ errors: [{ msg: "El usuario ya está registrado" }] });
    }

    await user.save();

    //JWT - JSON WEB TOKEN
    const { token, expiresIn } = generateTokens(user._id);
    generateRefreshToken(user._id, res);

    // return res.json({ email, password });
    return res.status(201).json({ token, expiresIn });
  } catch (error) {
    console.log(error.code);
    // Manejo de error de clave duplicada por mongoose
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ errors: [{ msg: "El usuario ya está registrado" }] });
    } else {
      return res.status(500).json({ errors: [{ msg: "Error del servidor" }] });
    }
  }
};

export const login = async (req, res) => {
  console.log("Entro aquí?")
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Usuario o contraseña incorrectos" }] });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Usuario o contraseña incorrectos" }] });
    }

    //Generar el JWT - JSON WEB TOKEN
    const { token, expiresIn } = generateTokens(user._id);
    generateRefreshToken(user._id, res);

    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Error del servidor" }] });
  }
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean(); //la función lean() devuelve un objeto plano sin métodos de mongoose
    return res.json({ uid: user._id, email: user.email });
  } catch (error) {
    return res.status(500).json({ errors: [{ msg: "Error del servidor" }] });
  }
};

export const refreshToken = (req, res) => {
  try {
    //Generar el JWT - JSON WEB TOKEN
    const { token, expiresIn } = generateTokens(req.uid);
    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Error del servidor" }] });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.clearCookie("refreshToken");
  return res.json({ ok: true });
};
