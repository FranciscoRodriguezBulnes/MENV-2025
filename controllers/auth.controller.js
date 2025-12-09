import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

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

    // return res.json({ email, password });
    return res.status(201).json({ ok: true });
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
    const token = jwt.sign(
      {
        user: { uid: user._id },
      },
      process.env.JWT_SECRET,
      // { expiresIn: "1h" }
    );

    // const payload = {
    //   user: {
    //     uid: user._id,
    //   },
    // };

    return res.json({token});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Error del servidor" }] });
  }
};
