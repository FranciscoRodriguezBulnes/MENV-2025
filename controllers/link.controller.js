import { nanoid } from "nanoid";
import { Link } from "../models/Link.js";

export const getLinks = async (req, res) => {
  try {
    const links = await Link.find({ uid: req.uid });

    return res.json({ links });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Error del servidor" }] });
  }
};

export const getLink = async (req, res) => {
  try {
    const { id } = req.params;
    const link = await Link.findById(id);

    if (!link) return res.status(404).json({ error: "No existe la URL" });
    if (!link.uid.equals(req.uid))
      return res.status(401).json({ error: "No te perneneces ese id" });

    console.log(link);

    return res.json({ link });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res
        .status(403)
        .json({ errors: [{ msg: "Formato id incorrecto" }] });
    }
    return res.status(500).json({ errors: [{ msg: "Error del servidor" }] });
  }
};

export const createLink = async (req, res) => {
  try {
    const { longLink } = req.body;
    //He quitado el let y lo que sigue porque lo manejo en el frontend
    // if (!longLink.startsWith("http://") && !longLink.startsWith("https://")) {
    //   longLink = "http://" + value;
    // }

    console.log(longLink);

    const link = new Link({ longLink, nanoLink: nanoid(6), uid: req.uid });
    const newLink = await link.save();

    return res.status(201).json({ newLink });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Error del servidor" }] });
  }
};

export const removeLink = async (req, res) => {
  try {
    const { id } = req.params;
    const link = await Link.findById(id);

    if (!link) return res.status(404).json({ error: "No existe la URL" });
    if (!link.uid.equals(req.uid))
      return res.status(401).json({ error: "No te perneneces ese id" });

    console.log(link);

    await link.remove();

    return res.json({ link });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res
        .status(403)
        .json({ errors: [{ msg: "Formato id incorrecto" }] });
    }
    return res.status(500).json({ errors: [{ msg: "Error del servidor" }] });
  }
};
