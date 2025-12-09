import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true, // corregido el typo
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
});

// Encriptar la contraseña antes de guardar el usuario
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
  } catch (error) {
    console.error("Error al encriptar la contraseña:", error);
    throw error; // Mongoose capturará el error
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcryptjs.compare(candidatePassword, this.password);
} ;

export const User = model("User", userSchema);

