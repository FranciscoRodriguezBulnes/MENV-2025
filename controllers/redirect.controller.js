import { Link } from '../models/Link.js';



export const redirectLink = async (req, res) => {
  try {
    const { nanoLink } = req.params;
    const link = await Link.findOne({ nanoLink });

    if (!link) return res.status(404).json({ error: "No existe la URL" });
    // if (!link.uid.equals(req.uid))
    //   return res.status(401).json({ error: "No te perneneces ese id" });

    console.log(link);

    return res.redirect(link.longLink)
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res
        .status(403)
        .json({ errors: [{ msg: "Formato id incorrecto" }] });
    }
    return res.status(500).json({ errors: [{ msg: "Error del servidor" }] });
  }
};

